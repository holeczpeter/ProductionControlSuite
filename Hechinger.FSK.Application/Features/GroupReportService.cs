using System.Diagnostics;
using System.Globalization;

namespace Hechinger.FSK.Application.Features
{
    public class GroupReportService : IGroupReportService
    {
        Func<DateTime, int> weekProjector =
            d => CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                 d,
                 CalendarWeekRule.FirstFullWeek,
                 DayOfWeek.Monday);

        Func<DateTime, int> monthProjector =
          d => CultureInfo.CurrentCulture.Calendar.GetMonth(
               d);

        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        private readonly IQualityService qualityService;
        public GroupReportService(FSKDbContext context, IQuantityService quantityService, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<GroupReportModel> Get(GetGroupReport request, CancellationToken cancellationToken)
        {
            if (request.View == Views.Month) return await Get(request, weekProjector, cancellationToken);
            else return await Get(request, monthProjector, cancellationToken);
        }

        private async Task<GroupReportModel> Get(GetGroupReport request, Func<DateTime, int> groupRule, CancellationToken cancellationToken)
        {
            var items = new List<OperationItem>();
            Stopwatch stopWatch = Stopwatch.StartNew();
            var start = request.StartDate;
            var end = request.EndDate;
            var operationsGroupsId = await context.EntityGroups.Where(x => x.Id == request.EntityGroupId).SelectMany(x => x.Children).Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = x.TranslatedName,
                RelationsIds = x.EntityGroupRelations.Select(r => new { Id = r.Id, EntityId = r.EntityId }),
                Children = x.Children.Select(c => new
                {
                    Id = c.Id,
                    Name = c.Name,
                    Code = c.Code,
                    TranslatedName = c.TranslatedName,
                    RelationsIds = c.EntityGroupRelations.Select(r => new { Id = r.Id, EntityId = r.EntityId }),
                })
            }).ToListAsync(cancellationToken);
            var categories = new List<DefectCategoryModel>();
            foreach (int item in Enum.GetValues(typeof(DefectCategories)))
            {
                categories.Add(new DefectCategoryModel { Category = (DefectCategories)item, Name = ((DefectCategories)item).GetDescription() });
            }

            foreach (var op in operationsGroupsId)
            {
                var operationCodes = this.context.Operations.Where(x => op.RelationsIds.Select(i => i.EntityId).Contains(x.Id)).Select(x => x.Code).ToList();
                var operationCodeList = operationCodes.Aggregate("", (current, next) => current + ", " + next);
                var cards = await this.context.SummaryCards
                           .Where(sc =>
                                 op.RelationsIds.Select(r => r.EntityId).Contains(sc.OperationId) &&
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
                var weekItems = (from c in cards
                                 group c by groupRule(c.Date) into g
                                 select new PeriodItem()
                                 {
                                     PeriodNumber = g.Key,
                                     Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                                     DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                                     Ppm = this.qualityService.GetPpm(g.ToList().Select(x => x.Quantity).Sum(), g.ToList().Select(x => x.DefectQuantity).Sum()),
                                 }).ToList();
                var item = new OperationItem()
                {
                    OperationId = op.Id,
                    OperationName = op.Name,
                    OperationCode = op.Code,
                    OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                    PeriodItems = weekItems,
                    OperationCodes = operationCodeList,
                    Defects = op.Children.Select(d => new DefectItem()
                    {
                        DefectId = d.Id,
                        DefectName = d.Name,
                        DefectCode = d.Code,
                        DefectCategory = this.context.Defects.Where(x=>x.Id == d.Id).Select(x => x.DefectCategory).FirstOrDefault(),
                        DefectTranslatedName = !String.IsNullOrEmpty(d.TranslatedName) ? d.TranslatedName : d.Name,
                        PeriodItems = (from sc in this.context.SummaryCardItems
                                       where
                                       sc.SummaryCard.Date >= start.Date && sc.SummaryCard.Date <= end.Date &&
                                       d.RelationsIds.Select(r => r.EntityId).Contains(sc.DefectId) &&
                                       sc.EntityStatus == EntityStatuses.Active
                                       select new
                                       {
                                           Date = sc.SummaryCard.Date,
                                           Quantity = sc.SummaryCard.Quantity,
                                           DefectQuantity = sc.Quantity,
                                           Category = sc.Defect.DefectCategory
                                       }).ToList()
                                     .GroupBy(i => new { Week = groupRule(i.Date), Category = i.Category })
                                     .Select(g => new PeriodItem()
                                     {

                                         PeriodNumber = g.Key.Week,
                                         DefectCategory = g.Key.Category,
                                         DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                                         Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                                         Ppm = this.qualityService.GetPpm(g.ToList().Select(x => x.Quantity).Sum(), g.ToList().Select(x => x.DefectQuantity).Sum()),


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
