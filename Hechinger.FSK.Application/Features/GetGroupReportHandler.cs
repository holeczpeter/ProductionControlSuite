using System.Diagnostics;

namespace Hechinger.FSK.Application.Features
{
    public class GetGroupReportHandler : IRequestHandler<GetGroupReport, GroupReportModel>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        public GetGroupReportHandler(FSKDbContext context, IQuantityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<GroupReportModel> Handle(GetGroupReport request, CancellationToken cancellationToken)
        {
            var items = new List<QuantityOperationReportModel>();
            Stopwatch stopWatch = Stopwatch.StartNew();
            var start = request.StartDate;
            var end = request.EndDate;
            var operationsGroupsId = await context.EntityGroups.Where(x => x.Id == request.EntityGroupId).SelectMany(x => x.Children).Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = x.TranslatedName,
                RelationsIds = x.EntityGroupRelations.Select(r=> new { Id = r.Id, EntityId = r.EntityId } ),
                Children = x.Children.Select(c => new
                {
                    Id = c.Id,
                    Name = c.Name,
                    Code = c.Code,
                    TranslatedName = c.TranslatedName,
                    RelationsIds = c.EntityGroupRelations.Select(r => new { Id = r.Id, EntityId = r.EntityId }),
                })
            }).ToListAsync(cancellationToken);
            foreach (var op in operationsGroupsId)
            {
                var cards = await this.context.SummaryCards
                           .Where(sc =>
                                 op.RelationsIds.Select(r=>r.EntityId).Contains(sc.OperationId)  &&
                                 sc.Date.Date >= start.Date.Date && sc.Date.Date <= end.Date.Date &&
                                 sc.EntityStatus == EntityStatuses.Active)
                           .Select(sc => new
                           {
                               OperationId = sc.OperationId,
                               Date = sc.Date,
                               ShiftId = sc.ShiftId,
                               Quantity = sc.Quantity,
                               DefectQuantity = sc.DefectQuantity,

                           }).ToListAsync(cancellationToken);
                var days = cards
                   .GroupBy(sc => new { Date = sc.Date.Date, Shift = sc.ShiftId })
                   .Select(g => new QuantityOperationDayModel()
                   {
                       Date = g.Key.Date,
                       ShiftId = g.Key.Shift,
                       Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                       DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                       Ppm = 0 // this.qualityService.GetPpm(g.ToList().Select(x => x.Quantity).Sum(), g.ToList().Select(x => x.DefectQuantity).Sum()),
                   }).ToList();
                var item = new QuantityOperationReportModel()
                {
                    OperationId = op.Id,
                    OperationName = op.Name,
                    OperationCode = op.Code,
                    OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                    Days = days,
                    Defects = op.Children.Select(d => new QuantityDefectReportModel()
                    {
                        DefectId = d.Id,
                        DefectName = d.Name,
                        DefectCode = d.Code,
                        DefectTranslatedName = !String.IsNullOrEmpty(d.TranslatedName) ? d.TranslatedName : d.Name,
                        Days = this.context.SummaryCardItems.Where(sc =>
                                                sc.SummaryCard.Date >= start.Date && sc.SummaryCard.Date <= end.Date &&
                                                d.RelationsIds.Select(r=>r.EntityId).Contains(sc.DefectId) &&
                                                sc.EntityStatus == EntityStatuses.Active)
                                                .GroupBy(sc => new { Date = sc.SummaryCard.Date, Shift = sc.SummaryCard.ShiftId }).Select(sc => new QuantityDayReportModel()
                                                {

                                                    Date = sc.Key.Date,
                                                    ShiftId = sc.Key.Shift,
                                                    DefectQuantity = sc.Select(x => x.Quantity).Sum(),
                                                    Quantity = sc.Select(x => x.SummaryCard.Quantity).Sum(),
                                                    Ppm = 0 //this.qualityService.GetPpm(sc.Select(x => x.SummaryCard.Quantity).Sum(), sc.Select(x => x.Quantity).Sum()),

                                                }).ToList(),
                    }).ToList()
                };
                items.Add(item);
            }
            stopWatch.Stop();
            Console.WriteLine("Elapsed time {0} ms", stopWatch.ElapsedMilliseconds);
            return new GroupReportModel() { Items = items };
        }
    }
}
