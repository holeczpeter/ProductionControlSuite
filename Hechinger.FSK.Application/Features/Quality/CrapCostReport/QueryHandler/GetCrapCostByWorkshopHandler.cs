namespace Hechinger.FSK.Application.Features
{
    public class GetCrapCostByWorkshopHandler : IRequestHandler<GetCrapCostByWorkshop, CrapCostWorkshopModel>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        private readonly IPermissionService permissionService;
        public GetCrapCostByWorkshopHandler(FSKDbContext context, IQualityService qualityService, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<CrapCostWorkshopModel> Handle(GetCrapCostByWorkshop request, CancellationToken cancellationToken)
        {
            var permittedWorkshops = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            var currentWorkshop = await this.context.Workshops
               .Where(x => x.Id == request.WorkshopId && permittedWorkshops.Contains(x.Id))
               .AsNoTracking()
               .Select(p => new
               {
                   Id = p.Id,
                   Code = p.Code,
                   Name = p.Name,
               }).FirstOrDefaultAsync(cancellationToken);

            if (currentWorkshop != null)
            {
                var products = await this.context.Products
                    .Where(x => x.WorkshopId == request.WorkshopId)
                    .AsNoTracking()
                    .Select(p => new
                    {
                        Id = p.Id,
                        Code = p.Code,
                        Name = p.Name,
                        TranslatedName = p.TranslatedName,
                    }).ToListAsync(cancellationToken);

                var operations = await this.context.Operations
                      .Where(p => p.Product.Workshop.Id == request.WorkshopId && p.EntityStatus == EntityStatuses.Active)
                      .AsNoTracking()
                      .ToListAsync(cancellationToken);

                var items = await this.context.SummaryCardItems
                    .Where(sc => sc.SummaryCard.Operation.Product.WorkshopId == request.WorkshopId &&
                          sc.SummaryCard.Date.Date >= request.StartDate.Date.Date &&
                          sc.SummaryCard.Date.Date <= request.EndDate.Date &&
                          sc.EntityStatus == EntityStatuses.Active)
                    .Select(sc => new
                    {
                        OperationId = sc.SummaryCard.OperationId,
                        Date = sc.SummaryCard.Date,
                        Quantity = sc.SummaryCard.Quantity,
                        DefectQuantity = sc.Quantity
                    }).ToListAsync(cancellationToken);

                var result = new CrapCostWorkshopModel()
                {
                    WorkshopId = currentWorkshop.Id,
                    WorkshopName = currentWorkshop.Name,
                    Products = products.Select(product => new CrapCostProductModel()
                    {
                        ProductId = product.Id,
                        ProductName = product.Name,
                        ProductCode = product.Code,
                        ProductTranslatedName = product.TranslatedName,
                        Operations = operations.Where(x => x.ProductId == product.Id).Select(op => new CrapCostOperationModel()
                        {
                            OperationId = op.Id,
                            OperationName = op.Name,
                            OperationCode = op.Code,
                            OperationTime = op.OperationTime,
                            OperationTranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                            Days = items.Where(x => x.OperationId == op.Id).GroupBy(sc => new { OperationId = sc.OperationId, Date = sc.Date.Date }).Select(g => new CrapCostDayModel()
                            {
                                OperationId = g.Key.OperationId,
                                Date = g.Key.Date,
                                DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                                Quantity = g.ToList().Select(x => x.Quantity).Sum(),
                                Value = this.qualityService.CrapCost(op.OperationTime, g.ToList().Select(x => x.DefectQuantity).Sum())
                            }).ToList(),
                        }).ToList()
                    }).ToList()
                };
                return result;
            }
            else return null;

        }
    }
}
