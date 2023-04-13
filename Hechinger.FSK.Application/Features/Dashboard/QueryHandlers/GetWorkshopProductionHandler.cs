using System.Diagnostics;

namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopProductionHandler : IRequestHandler<GetWorkshopProduction, IEnumerable<WorkshopProduction>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetWorkshopProductionHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }


        public async Task<IEnumerable<WorkshopProduction>> Handle(GetWorkshopProduction request, CancellationToken cancellationToken)
        {
            if(cancellationToken.IsCancellationRequested) { Debug.WriteLine("CancellationToken"); }
            var workshops = await this.context.Workshops
                .AsNoTracking()
                .Select(w => new { Id = w.Id, Name = w.Name })
                .ToListAsync(cancellationToken);
            if (cancellationToken.IsCancellationRequested) { return null; }
            var cardItems = await this.context.SummaryCards
                 .Where(sc => sc.Date.Date >= request.StartDate.Date.Date &&
                              sc.Date.Date <= request.EndDate.Date &&
                              sc.EntityStatus == EntityStatuses.Active)
                 .Select(sc => new
                 {
                     WorkshopId = sc.Operation.Product.Workshop.Id,
                     Date = sc.Date,
                     Quantity = sc.Quantity,
                     DefectQuantity = sc.DefectQuantity
                 }).ToListAsync(cancellationToken);
            if (cancellationToken.IsCancellationRequested) { Debug.WriteLine("CancellationToken"); }

            var items = cardItems.GroupBy(sc => new { WorkshopId = sc.WorkshopId, Date = sc.Date.Date }).Select(g => new ProductionDayInfo()
            {
                WorkshopId = g.Key.WorkshopId,
                Date = g.Key.Date,
                DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                Quantity = g.ToList().Select(x => x.Quantity).Sum(),
            }).ToList();
            if (cancellationToken.IsCancellationRequested) { Debug.WriteLine("CancellationToken"); }
            var results = workshops.Select(w => new WorkshopProduction()
            {
                WorkshopId = w.Id,
                WorkshopName = w.Name,
                Days = items.Where(x => x.WorkshopId == w.Id).ToList(),

            }).ToList();
            if (cancellationToken.IsCancellationRequested) { Debug.WriteLine("CancellationToken"); }
            return results;

        }
    }
}
