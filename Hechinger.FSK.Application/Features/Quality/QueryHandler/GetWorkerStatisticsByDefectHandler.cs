namespace Hechinger.FSK.Application.Features
{
    public class GetWorkerStatisticsByDefectHandler : IRequestHandler<GetWorkerStatisticsByDefect, IEnumerable<WorkerStatisticModel>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetWorkerStatisticsByDefectHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<WorkerStatisticModel>> Handle(GetWorkerStatisticsByDefect request, CancellationToken cancellationToken)
        {
           
            var items = await (from c in this.context.SummaryCards
                         join i in this.context.SummaryCardItems on c.Id equals i.SummaryCardId
                         where c.Date.Date >= request.StartDate &&
                               c.Date <= request.EndDate &&
                               i.DefectId == request.DefectId &&
                               c.EntityStatus == EntityStatuses.Active &&
                               i.EntityStatus == EntityStatuses.Active
                               select new 
                               {
                                   WorkerCode = c.WorkerCode,
                                   Quantity = c.Quantity,
                                   DefectQuantity = i.Quantity
                               }).ToListAsync(cancellationToken);

            var result = items.GroupBy(item => new { WorkerCode = item.WorkerCode }).Select(x => new WorkerStatisticModel()
            {
                WorkerCode = x.Key.WorkerCode,
                Quantity = x.Sum(x=>x.Quantity),
                DefectQuantity =  x.Sum(x => x.DefectQuantity),
                Ppm = this.qualityService.GetPpm(x.Sum(x => x.Quantity), x.Sum(x => x.DefectQuantity))

            }).OrderByDescending(x=>x.Ppm).ToList();
            return result;
        }
    }
}
