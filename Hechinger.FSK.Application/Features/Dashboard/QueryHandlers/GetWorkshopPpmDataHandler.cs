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
            var workshops = await this.context.Workshops
                .AsNoTracking()
                .Select(w => new { Id = w.Id, Name = w.Name })
                .ToListAsync(cancellationToken);

            var cards = await this.context.SummaryCards
                .Where(sc => sc.Date.Date >= request.StartDate.Date.Date &&
                             sc.Date.Date <= request.EndDate.Date &&
                             sc.EntityStatus == EntityStatuses.Active)
                .Select(sc => new
                {
                    WorkshopId = sc.Operation.Product.Workshop.Id,
                    Quantity = sc.Quantity,
                    DefectQuantity = sc.DefectQuantity
                }).ToListAsync(cancellationToken);

            var groups = cards
                .GroupBy(r => new { WorkshopId = r.WorkshopId, })
                .Select(g => new WorkshopPpmData()
                {
                    WorkshopId = g.Key.WorkshopId,
                    Ppm = this.qualityService.GetPpm(g.ToList().Select(x => x.Quantity).Sum(), g.ToList().Select(x => x.DefectQuantity).Sum()),
                }).ToList();

            var results = workshops.Select(w => new WorkshopPpmData()
            {
                WorkshopId = w.Id,
                WorkshopName = w.Name,
                Ppm = groups.Where(i=>i.WorkshopId == w.Id).Select(i=>i.Ppm).FirstOrDefault()

            }).ToList();
            return results;

        }
    }
}
