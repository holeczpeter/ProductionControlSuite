namespace Hechinger.FSK.Application.Features
{
    public class GetDefectStatisticsByUserHandler : IRequestHandler<GetDefectStatisticsByUser, DefectStatisticModel>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;

        public GetDefectStatisticsByUserHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<DefectStatisticModel> Handle(GetDefectStatisticsByUser request, CancellationToken cancellationToken)
        {
            var currentOperation = await this.context.Operations
                .Where(x=>x.Id == request.OperationId)
                .Select(x=> new 
                { 
                    Code = x.Code,  
                    Name = x.Name,  
                    TranslatedName = x.TranslatedName,
                }).FirstOrDefaultAsync(cancellationToken);  
            var items = await (from c in this.context.SummaryCards
                               join i in this.context.SummaryCardItems on c.Id equals i.SummaryCardId
                               where c.Date.Date >= request.StartDate &&
                                     c.Date <= request.EndDate &&
                                     c.WorkerCode == request.WorkerCode &&
                                     c.OperationId == request.OperationId &&
                                     c.EntityStatus == EntityStatuses.Active &&
                                     i.EntityStatus == EntityStatuses.Active
                               select new
                               {
                                   DefectId= i.Defect.Id,
                                   DefectCode = i.Defect.Code,
                                   DefectName = i.Defect.Name,
                                   DefectTranslatedName = i.Defect.TranslatedName,
                                   DefectCategory = i.Defect.DefectCategory,
                                   DefectCategoryName = i.Defect.DefectCategory.GetDescription(),
                                   Quantity = c.Quantity,
                                   DefectQuantity = i.Quantity
                               }).ToListAsync(cancellationToken);
            var result = items.GroupBy(item => new { DefectId = item.DefectId }).Select(x => new DefectStatisticsItem()
            {
                
                DefectCode = x.FirstOrDefault().DefectCode,
                DefectName = x.FirstOrDefault().DefectName,
                DefectTranslatedName = x.FirstOrDefault().DefectTranslatedName,
                DefectCategory = x.FirstOrDefault().DefectCategory,
                DefectCategoryName = x.FirstOrDefault().DefectCategoryName,
                Quantity = x.Sum(x => x.Quantity),
                DefectQuantity = x.Sum(x => x.DefectQuantity),
                Ppm = this.qualityService.GetPpm(x.Sum(x => x.Quantity), x.Sum(x => x.DefectQuantity))

            }).OrderByDescending(x => x.Ppm).ToList();

            return new DefectStatisticModel()
            {
                StartDate = request.StartDate,
                EndDate = request.EndDate,  
                WorkerCode = request.WorkerCode,    
                OperationCode = currentOperation.Code,
                OperationName = currentOperation.Name,  
                OperationTranslatedName = currentOperation.TranslatedName,
                Items = result
            };
            
        }
    }
}
