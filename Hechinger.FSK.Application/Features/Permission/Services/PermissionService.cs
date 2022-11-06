namespace Hechinger.FSK.Application.Features
{
    public class PermissionService : IPermissionService
    {
        private readonly FSKDbContext context;
        public PermissionService(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<int>> GetPermissionToWorkshops(int userId, CancellationToken cancellationToken)
        {
            return await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
        }
        public async Task<IEnumerable<int>> GetPermissionToProducts(int userId, CancellationToken cancellationToken)
        {
            var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
            return await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);

        }
        public async Task<IEnumerable<int>> GetPermissionToOperation(int userId, CancellationToken cancellationToken)
        {
            var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
            var productsId = await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);
            return await this.context.Operations.Where(x => productsId.Contains(x.ProductId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);

        }
    }
}
