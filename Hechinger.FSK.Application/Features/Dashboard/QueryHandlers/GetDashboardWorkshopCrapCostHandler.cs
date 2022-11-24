namespace Hechinger.FSK.Application.Features
{
    public class GetDashboardWorkshopCrapCostHandler : IRequestHandler<GetDashboardWorkshopCrapCost, IEnumerable<DashboardWorkshopCrapCost>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetDashboardWorkshopCrapCostHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<DashboardWorkshopCrapCost>> Handle(GetDashboardWorkshopCrapCost request, CancellationToken cancellationToken)
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
                   CrapCost = Math.Round(this.qualityService.CrapCost(sc.SummaryCard.Operation.OperationTime, sc.Quantity), 2),
               }).ToListAsync(cancellationToken);

            var groups = items
                .GroupBy(r => new { WorkshopId = r.WorkshopId, })
                .Select(g => new DashboardWorkshopCrapCost()
                {
                    WorkshopId = g.Key.WorkshopId,
                    Value = Math.Round(g.ToList().Select(x=>x.CrapCost).Sum(), 2),
                }).ToList();

            var results = workshops.Select(w => new DashboardWorkshopCrapCost()
            {
                WorkshopId = w.Id,
                WorkshopName = w.Name,
                Value = groups.Where(i => i.WorkshopId == w.Id).Select(i => i.Value).FirstOrDefault()

            }).ToList();
            return results;

        }
    }
}
