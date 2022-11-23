using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features.Dashboard.QueryHandlers
{
    internal class GetProductionInformationHandler : IRequestHandler<GetProductionInformation, IEnumerable<ProductionInfo>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetProductionInformationHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<ProductionInfo>> Handle(GetProductionInformation request, CancellationToken cancellationToken)
        {
            var workshops = await this.context.Workshops
                .AsNoTracking()
                .Select(w => new { Id = w.Id, Name = w.Name })
                .ToListAsync(cancellationToken);

            var cardItems = await this.context.SummaryCardItems
                 .Where(sc => sc.SummaryCard.Date.Date >= request.StartDate.Date.Date &&
                              sc.SummaryCard.Date.Date <= request.EndDate.Date &&
                              sc.EntityStatus == EntityStatuses.Active)
                 .Select(sc => new
                 {
                     WorkshopId = sc.SummaryCard.Operation.Product.Workshop.Id,
                     Date = sc.SummaryCard.Date,
                     Quantity = sc.SummaryCard.Quantity,
                     DefectQuantity = sc.Quantity
                 }).ToListAsync(cancellationToken);

            var items = cardItems.GroupBy(sc => new { WorkshopId = sc.WorkshopId, Date = sc.Date.Date }).Select(g => new ProductionDayInfo()
            {
                WorkshopId = g.Key.WorkshopId,
                Date = g.Key.Date,
                DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                Quantity = g.ToList().Select(x => x.Quantity).Sum(),
            }).ToList();
            
            var results = workshops.Select(w => new ProductionInfo()
            {
                WorkshopId = w.Id,
                WorkshopName = w.Name,
                Days = items.Where(x=>x.WorkshopId == w.Id).ToList(),

            }).ToList();
            return results;

        }
    }
}
