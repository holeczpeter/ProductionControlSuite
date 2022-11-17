namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopPpmDataHandler : IRequestHandler<GetWorkshopPPmData, IEnumerable<WorkshopPpmData>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetWorkshopPpmDataHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<WorkshopPpmData>> Handle(GetWorkshopPPmData request, CancellationToken cancellationToken)
        {
            var result = await this.context.SummaryCards.Where(sc =>
                          sc.Date.Date >= request.StartDate.Date.Date &&
                          sc.Date.Date <= request.EndDate.Date &&
                          sc.EntityStatus == EntityStatuses.Active)
                .Select(sc => new
                {
                    WorkshopId = sc.Operation.Product.Workshop.Id,
                    WorkshopName = sc.Operation.Product.Workshop.Name,
                    Quantity = sc.Quantity,
                    DefectQuantity = 40
                })
                .GroupBy(r => new { WorkshopId = r.WorkshopId, })
                .Select(g => new WorkshopPpmData()
                {
                    WorkshopId = g.Key.WorkshopId,
                    WorkshopName = g.First().WorkshopName,   
                    Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                    DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                    Ppm = this.qualityService.GetPpm(g.ToList().Select(x => x.Quantity).Sum(), g.ToList().Select(x => x.DefectQuantity).Sum()),
                }).ToListAsync(cancellationToken);
        
            return result;

        }
    }
}
