namespace Hechinger.FSK.Application.Features
{
    public class GetProductsCountHandler : IRequestHandler<GetProductsCount, int>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetProductsCountHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<int> Handle(GetProductsCount request, CancellationToken cancellationToken)
        {
            var permittedProducts = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await this.context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedProducts.Contains(x.WorkshopId))
                .CountAsync(cancellationToken);
        }
    }
}
