namespace Hechinger.FSK.Application.Features
{
    public class GetCrapCostByProductHandler : IRequestHandler<GetCrapCostByProduct, CrapCostProductModel>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetCrapCostByProductHandler(FSKDbContext context, IQualityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<CrapCostProductModel> Handle(GetCrapCostByProduct request, CancellationToken cancellationToken)
        {

            var operations = await this.context.Operations
                .Where(p => p.ProductId == request.ProductId && p.EntityStatus == EntityStatuses.Active)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            var product = await this.context.Products
                .AsNoTracking()
                .Where(x => x.Id == request.ProductId)
                .Select(p => new
                {
                    Id = p.Id,
                    Code = p.Code,
                    Name = p.Name,
                    TranslatedName = p.TranslatedName,
                }).FirstOrDefaultAsync(cancellationToken);

            var items = await this.context.SummaryCardItems
              .Where(sc => sc.SummaryCard.Operation.ProductId == request.ProductId &&
                           sc.SummaryCard.Date.Date >= request.StartDate.Date.Date &&
                           sc.SummaryCard.Date.Date <= request.EndDate.Date &&
                           sc.EntityStatus == EntityStatuses.Active)
              .Select(sc => new
              {
                  OperationId = sc.SummaryCard.OperationId,
                  Quantity = sc.SummaryCard.Quantity,
                  Date = sc.SummaryCard.Date,
                  DefectQuantity = sc.Quantity
              }).ToListAsync(cancellationToken);

            var result = new CrapCostProductModel()
            {
                ProductId = product.Id,
                ProductName = product.Name,
                ProductCode = product.Code,
                ProductTranslatedName = product.TranslatedName,
                Operations = operations.Select(op => new CrapCostOperationModel()
                {
                    OperationId = op.Id,
                    OperationName = op.Name,
                    OperationCode = op.Code,
                    OperationTime = op.OperationTime,
                    OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                    Days = items.Where(x=>x.OperationId == op.Id).GroupBy(sc => new { OperationId = sc.OperationId, Date = sc.Date.Date }).Select(g => new CrapCostDayModel()
                    {
                        OperationId = g.Key.OperationId,
                        Date = g.Key.Date,
                        DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                        Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                        Value = this.qualityService.CrapCost(op.OperationTime, g.ToList().Select(x => x.DefectQuantity).Sum())
                    }).ToList(),
                }).ToList()
            };

            return result;

        }
    }
}
