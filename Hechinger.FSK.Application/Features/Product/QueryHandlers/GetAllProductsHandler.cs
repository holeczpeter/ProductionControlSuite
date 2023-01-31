namespace Hechinger.FSK.Application.Features
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProducts, IEnumerable<ProductModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllProductsHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<ProductModel>> Handle(GetAllProducts request, CancellationToken cancellationToken)
        {
            var permittedProduct = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active &&
                            permittedProduct.Contains(x.WorkshopId))
                .Select(x => new ProductModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    WorkshopId = x.Workshop.Id,
                    WorkshopName = x.Workshop.Name,
                }).ToListAsync(cancellationToken);
        }
    }
}


