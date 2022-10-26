namespace Hechinger.FSK.Application.Features
{
    public class GetMonthlyQualityHistoryHandler : IRequestHandler<GetMonthlyQualityHistory, IEnumerable<MonthlyQualityModel>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetMonthlyQualityHistoryHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<MonthlyQualityModel>> Handle(GetMonthlyQualityHistory request, CancellationToken cancellationToken)
        {
            var startDate = new DateTime(request.Year, 1, 1);
            var endDate = new DateTime(request.Year, 12, 31);
            var items = await (from c in this.context.SummaryCards
                         join i in this.context.SummaryCardItem on c.Id equals i.SummaryCardId
                         where c.Date.Date >= startDate &&
                               c.Date <= endDate &&
                               c.Operation.ProductId == request.ProductId
                               select new 
                               {
                                   Date = c.Date,
                                   Quantity = c.Quantity,
                                   DefectQuantity = i.Quantity,
                                   Category = i.Defect.DefectCategory
                               }
                       ).ToListAsync();
            var groups = items.GroupBy(p => new { Category = p.Category }).Select(g => new MonthlyQualityModel
            {
                Category  = g.Key.Category,
                CategoryName = g.Key.Category.GetDescription(),
                Items = g.GroupBy(x=> new { Year=x.Date.Year, Month = x.Date.Month }).Select(a => new MonthlyQualityItem() 
                { 
                    Year = a.Key.Year,
                    Month = a.Key.Month,
                    Value = this.qualityService.GetPPM(a.Sum(z=>z.Quantity), a.Sum(c => c.DefectQuantity))
                }).ToList()
            });

            return groups.OrderBy(x=>x.Category).ToList();

        }
    }
}
