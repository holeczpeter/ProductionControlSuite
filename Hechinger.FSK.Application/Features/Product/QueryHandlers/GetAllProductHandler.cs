namespace Hechinger.FSK.Application.Features
{
    public class GetAllProductHandler : IRequestHandler<GetAllProducts, IEnumerable<ProductModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllProductHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<ProductModel>> Handle(GetAllProducts request, CancellationToken cancellationToken)
        {
            var permittedProducts = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active &&
                            permittedProducts.Contains(x.WorkshopId))
                .Select(x => new ProductModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    WorkshopId = x.Workshop.Id,
                    WorkshopName = x.Workshop.Name,

                })
                .FilterProduct(request.Parameters)
                .OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);
        }
    }
}