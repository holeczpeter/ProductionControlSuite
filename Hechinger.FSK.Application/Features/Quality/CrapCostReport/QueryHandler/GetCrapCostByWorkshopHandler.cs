namespace Hechinger.FSK.Application.Features
{
    public class GetCrapCostByWorkshopHandler : IRequestHandler<GetCrapCostByWorkshop, IEnumerable<CrapCostProductModel>>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        private readonly IPermissionService permissionService;
        public GetCrapCostByWorkshopHandler(FSKDbContext context, IQuantityService quantityService, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<CrapCostProductModel>> Handle(GetCrapCostByWorkshop request, CancellationToken cancellationToken)
        {
            var permittedProducts = await this.permissionService.GetPermissionToWorkshops(cancellationToken);

            var operations = await this.context.Operations
                .Where(p => p.Product.Workshop.Id == request.WorkshopId && p.EntityStatus == EntityStatuses.Active)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            var products = await this.context.Products
                .Where(x => x.WorkshopId == request.WorkshopId)
                .Select(p => new
                {
                    Id = p.Id,
                    Code = p.Code,
                    Name = p.Name,
                    TranslatedName = p.TranslatedName,
                }).ToListAsync(cancellationToken);

            var items = await this.context.SummaryCards
                       .Where(sc => sc.Operation.Product.WorkshopId == request.WorkshopId &&
                                    sc.Date.Date >= request.StartDate.Date.Date && sc.Date.Date <= request.EndDate.Date.Date &&
                                    sc.EntityStatus == EntityStatuses.Active)
                       .Select(sc => new {
                           OperationId = sc.OperationId,
                           Date = sc.Date,
                           Quantity = sc.Quantity,
                           DefectQuantity = sc.DefectQuantity
                       })
                       .ToListAsync(cancellationToken);
            var results = products.Select(product=>  new CrapCostProductModel()
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
            }).ToList();

           
            return results;

        }
    }
}
