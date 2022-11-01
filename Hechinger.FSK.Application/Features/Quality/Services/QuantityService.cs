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

        public async Task<QuantityProductReportModel> Get(int productId, DateTime start, DateTime end, CancellationToken cancellationToken)
        {
            
            var result = await this.context.Products.Where(p => p.Id == productId)
                .Select(p=> new QuantityProductReportModel()
                { 
                    ProductId= p.Id,
                    ProductName = p.Name,
                    ProductTranslatedName = p.TranslatedName,
                    Operations = p.Operations.Select(op => new QuantityOperationReportModel()
                    {
                        OperationId = op.Id,
                        OperationName = op.Name,
                        OperationTranslatedName = op.TranslatedName,
                        Defects = op.Defects.Select(d => new QuantityDefectReportModel()
                        {
                            DefectId = d.Id,
                            DefectName = d.Name,
                            DefectTranslatedName = d.TranslatedName,
                            DefectCategory = d.DefectCategory,
                            Days = d.SummaryCardItems.Where(sc=> sc.SummaryCard.Date.Date >= start.Date && sc.SummaryCard.Date.Date <= end.Date).GroupBy(sc=>sc.SummaryCard.Date).Select(sc => new  QuantityDayReportModel()
                            {
                                
                                Date = sc.Key.Date,
                                Year = sc.Key.Date.Year,
                                Month = sc.Key.Date.Month,
                                Quantity = sc.ToList().Select(x=>x.SummaryCard.Quantity).Sum(),
                                Shifts = sc.GroupBy(x=> new { Date = x.SummaryCard.Date,Shift = x.SummaryCard.ShiftId }).Select(i => new QuantityShiftReportModel()
                                {
                                 
                                    DefectQuantity = i.Select(x=>x.Quantity).Sum(),
                                    Quantity = i.Select(x => x.SummaryCard.Quantity).Sum(),
                                    ShiftId = i.Key.Shift,
                                    PPM = this.qualityService.GetPPM(i.Select(x => x.SummaryCard.Quantity).Sum(), i.Select(x => x.Quantity).Sum()),
                                })
                            }).ToList(),
                        }).ToList(),
                    }).ToList()
                }).FirstOrDefaultAsync(cancellationToken);
         
            return result;
        }
    }
}
