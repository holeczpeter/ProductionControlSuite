namespace Hechinger.FSK.Application.Features
{
    public class GetDashboardPpmHandler : IRequestHandler<GetDashboardPpm, IEnumerable<DashboardPpm>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetDashboardPpmHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<DashboardPpm>> Handle(GetDashboardPpm request, CancellationToken cancellationToken)
        {
            var workshops = await this.context.Workshops
                .AsNoTracking()
                .Select(w => new { Id = w.Id, Name = w.Name })
                .ToListAsync(cancellationToken);

            var items = await this.context.SummaryCardItems
                .Where(sc => sc.SummaryCard.Date.Date >= request.StartDate.Date.Date &&
                             sc.SummaryCard.Date.Date <= request.EndDate.Date &&
                             sc.EntityStatus == EntityStatuses.Active)
                .Select(sc => new
                {
                    WorkshopId = sc.SummaryCard.Operation.Product.Workshop.Id,
                    Quantity = sc.SummaryCard.Quantity,
                    DefectQuantity = sc.Quantity
                }).ToListAsync(cancellationToken);

            var groups = items
                .GroupBy(r => new { WorkshopId = r.WorkshopId, })
                .Select(g => new DashboardPpm()
                {
                    WorkshopId = g.Key.WorkshopId,
                    Ppm = this.qualityService.GetPpm(g.ToList().Select(x => x.Quantity).Sum(), g.ToList().Select(x => x.DefectQuantity).Sum()),
                }).ToList();

            var results = workshops.Select(w => new DashboardPpm()
            {
                WorkshopId = w.Id,
                WorkshopName = w.Name,
                Ppm = groups.Where(i=>i.WorkshopId == w.Id).Select(i=>i.Ppm).FirstOrDefault()

            }).ToList();
            return results;

        }
    }
}
