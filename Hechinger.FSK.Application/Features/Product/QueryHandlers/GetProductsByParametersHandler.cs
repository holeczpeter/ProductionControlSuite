namespace Hechinger.FSK.Application.Features
{
    public class GetProductsByParametersHandler : IRequestHandler<GetProductsByParameters, ParameterResult<ProductModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetProductsByParametersHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<ParameterResult<ProductModel>> Handle(GetProductsByParameters request, CancellationToken cancellationToken)
        {
            var permittedProducts = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            var products = context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedProducts.Contains(x.WorkshopId))
                .Select(x => new ProductModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    WorkshopId = x.Workshop.Id,
                    WorkshopName = x.Workshop.Name,

                }).FilterProduct(request.Parameters);

            var count = await  products.CountAsync(cancellationToken);
            var result = await products.OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);

            return new ParameterResult<ProductModel>() { Count = count, Result = result };
        }
    }
}