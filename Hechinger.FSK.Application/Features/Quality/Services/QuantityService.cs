﻿namespace Hechinger.FSK.Application.Features
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
            var operations = await this.context.Operations.Where(p => p.ProductId == productId && p.EntityStatus == EntityStatuses.Active).AsNoTracking().ToListAsync(cancellationToken);
            var days = await this.context.SummaryCards
                        .Where(sc => sc.Operation.ProductId == productId && 
                                     sc.Date.Date >= start.Date.Date && sc.Date.Date <= end.Date.Date && 
                                     sc.EntityStatus == EntityStatuses.Active)
                        .Select(sc => new { OperationId=sc.OperationId, Date = sc.Date, ShiftId = sc.ShiftId, Quantity = sc.Quantity, sc.EntityStatus })
                        .GroupBy(sc => new { OperationId = sc.OperationId, Date = sc.Date.Date, Shift = sc.ShiftId })
                        .Select(g => new QuantityOperationDayModel()
                        {
                            OperationId = g.Key.OperationId,
                            Date = g.Key.Date,
                            ShiftId = g.Key.Shift,
                            Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                        }).ToListAsync(cancellationToken);


            var result = operations
                .Select(op => new QuantityOperationReportModel()
                {
                    OperationId = op.Id,
                    OperationName = op.Name,
                    OperationCode = op.Code,
                    OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                    Days = days.Where(x=>x.OperationId == op.Id),
                    Defects = this.context.Defects.Where(d=>d.EntityStatus == EntityStatuses.Active && d.OperationId == op.Id)
                    .Select(d => new QuantityDefectReportModel()
                    {
                        DefectId = d.Id,
                        DefectName = d.Name,
                        DefectCode = d.Code,
                        DefectTranslatedName = !String.IsNullOrEmpty(d.TranslatedName) ? d.TranslatedName : d.Name,
                        DefectCategory = d.DefectCategory,
                        Days = this.context.SummaryCardItem.Where(sc => 
                        sc.SummaryCard.Date >= start.Date && sc.SummaryCard.Date <= end.Date &&  
                        sc.DefectId == d.Id &&
                        sc.EntityStatus == EntityStatuses.Active)
                        .GroupBy(sc => new { Date = sc.SummaryCard.Date, Shift = sc.SummaryCard.ShiftId }).Select(sc => new QuantityDayReportModel()
                        {

                            Date = sc.Key.Date,
                            ShiftId = sc.Key.Shift,
                            DefectQuantity = sc.Select(x => x.Quantity).Sum(),
                            Quantity = sc.Select(x => x.SummaryCard.Quantity).Sum(),
                            PPM = this.qualityService.GetPPM(sc.Select(x => x.SummaryCard.Quantity).Sum(), sc.Select(x => x.Quantity).Sum()),

                        }).ToList(),
                    }).ToList(),
                }).ToList();

            return result;
        }
    }
}
