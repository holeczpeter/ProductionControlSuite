namespace Hechinger.FSK.Application.Features
{
    public class GetDefectCompareByUserHandler : IRequestHandler<GetDefectCompareByUser, IEnumerable<DefectCompareByUser>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetDefectCompareByUserHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<DefectCompareByUser>> Handle(GetDefectCompareByUser request, CancellationToken cancellationToken)
        {

            var items = await (from c in this.context.SummaryCards
                               join i in this.context.SummaryCardItem on c.Id equals i.SummaryCardId
                               where c.Date.Date >= request.StartDate &&
                                     c.Date <= request.EndDate &&
                                     c.WorkerCode == request.WorkerCode &&
                                     c.OperationId == request.OperationId
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
            var result = items.GroupBy(item => new { DefectId = item.DefectId }).Select(x => new DefectCompareByUser()
            {
                
                DefectCode = x.FirstOrDefault().DefectCode,
                DefectName = x.FirstOrDefault().DefectName,
                DefectTranslatedName = x.FirstOrDefault().DefectTranslatedName,
                DefectCategory = x.FirstOrDefault().DefectCategory,
                DefectCategoryName = x.FirstOrDefault().DefectCategoryName,
                Quantity = x.Sum(x => x.Quantity),
                DefectQuantity = x.Sum(x => x.DefectQuantity),
                Ppm = this.qualityService.GetPPM(x.Sum(x => x.Quantity), x.Sum(x => x.DefectQuantity))

            }).OrderByDescending(x => x.Ppm).ToList();
            return result;
        }
    }
}
