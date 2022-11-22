namespace Hechinger.FSK.Application.Features
{
    public class GetCrapCostByOperationHandler : IRequestHandler<GetCrapCostByOperation, CrapCostProductModel>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        public GetCrapCostByOperationHandler(FSKDbContext context, IQuantityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<CrapCostProductModel> Handle(GetCrapCostByOperation request, CancellationToken cancellationToken)
        {

            var operations = await this.context.Operations
                .Where(p => p.Id == request.OperationId && p.EntityStatus == EntityStatuses.Active)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            var product = await this.context.Products
                .AsNoTracking()
                .Where(x=>x.Operations.Select(x=>x.Id).Contains(request.OperationId))
                .Select(p=> new 
                { 
                    Id = p.Id,
                    Code =  p.Code,
                    Name = p.Name,  
                    TranslatedName = p.TranslatedName,
                }).FirstOrDefaultAsync(cancellationToken);
            
            var items = await this.context.SummaryCards
                       .Where(sc => sc.OperationId == request.OperationId &&
                                    sc.Date.Date >= request.StartDate.Date.Date && sc.Date.Date <= request.EndDate.Date.Date &&
                                    sc.EntityStatus == EntityStatuses.Active)
                       .Select(sc => new 
                       { 
                           OperationId = sc.OperationId, 
                           Date = sc.Date, 
                           Quantity = sc.Quantity,
                           DefectQuantity = sc.DefectQuantity
                       })
                       .ToListAsync(cancellationToken);

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
                    OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                    Days = items.GroupBy(sc => new { OperationId = sc.OperationId, Date = sc.Date.Date }).Select(g => new CrapCostDayModel()
                       {
                           OperationId = g.Key.OperationId,
                           Date = g.Key.Date,
                           DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                           Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                           Value = 10,
                       }).ToList(),
                }).ToList()
            };

            return result;
           
        }
    }
}
