namespace Hechinger.FSK.Application.Features
{
    public class QuantityService : IQuantityService
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public QuantityService(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<QuantityOperationReportModel>> Get(int productId, DateTime start, DateTime end, CancellationToken cancellationToken)
        {
            var operations = await this.context.Operations.Where(p => p.ProductId == productId && p.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);


            var result = await this.context.Operations.Where(p => p.ProductId == productId && p.EntityStatus == EntityStatuses.Active)
                .Select(op => new QuantityOperationReportModel()
                {
                    OperationId = op.Id,
                    OperationName = op.Name,
                    OperationCode = op.Code,
                    OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                    Days = op.SummaryCards
                        .Where(sc => sc.Date >= start && sc.Date <= end  && sc.EntityStatus == EntityStatuses.Active).AsEnumerable()
                        .GroupBy(sc => new { Date = sc.Date.Date, Shift = sc.ShiftId })
                        .Select(g => new QuantityDayReportModel()
                        {
                            Date = g.Key.Date,
                            ShiftId = g.Key.Shift,
                            DefectQuantity = g.SelectMany(i => i.SummaryCardItems).Select(i => i.Quantity).Sum(),
                            Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                        }).ToList(),
                    Defects = op.Defects.Select(d => new QuantityDefectReportModel()
                    {
                        DefectId = d.Id,
                        DefectName = d.Name,
                        DefectCode = d.Code,
                        DefectTranslatedName = !String.IsNullOrEmpty(d.TranslatedName) ? d.TranslatedName : d.Name,
                        DefectCategory = d.DefectCategory,
                        Days = d.SummaryCardItems.Where(sc => sc.SummaryCard.Date.Date >= start.Date && sc.SummaryCard.Date.Date <= end.Date &&  sc.EntityStatus == EntityStatuses.Active).ToList()
                        .GroupBy(sc => new { Date = sc.SummaryCard.Date.Date, Shift = sc.SummaryCard.ShiftId }).Select(sc => new QuantityDayReportModel()
                        {

                            Date = sc.Key.Date,
                            ShiftId = sc.Key.Shift,
                            DefectQuantity = sc.Select(x => x.Quantity).Sum(),
                            Quantity = sc.Select(x => x.SummaryCard.Quantity).Sum(),
                            PPM = this.qualityService.GetPPM(sc.Select(x => x.SummaryCard.Quantity).Sum(), sc.Select(x => x.Quantity).Sum()),

                        }).ToList(),
                    }).ToList(),
                }).ToListAsync(cancellationToken);

            return result;
        }
    }
}
