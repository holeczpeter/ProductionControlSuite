namespace Hechinger.FSK.Application.Features
{
    public class PermissionService : IPermissionService
    {
        private readonly FSKDbContext context;
        public PermissionService(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<int>> GetPermissionToWorkshops(int userId, CancellationToken cancellation)
        {
            return await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active)
              .Select(x => x.WorkShopId).ToListAsync(cancellation);
        }
        public async Task<IEnumerable<int>> GetPermissionToProducts(int userId, CancellationToken cancellation)
        {
            var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active)
              .Select(x => x.WorkShopId).ToListAsync(cancellation);
            return await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId)).Select(x => x.Id).ToListAsync();

        }
        public async Task<IEnumerable<int>> GetPermissionToOperation(int userId, CancellationToken cancellation)
        {
            var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active)
              .Select(x => x.WorkShopId).ToListAsync(cancellation);
            var productsId = await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId)).Select(x => x.Id).ToListAsync();
            return await this.context.Operations.Where(x => productsId.Contains(x.ProductId)).Select(x => x.Id).ToListAsync();

        }
    }
}
