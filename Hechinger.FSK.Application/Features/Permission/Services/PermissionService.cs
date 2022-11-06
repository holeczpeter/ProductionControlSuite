using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Hechinger.FSK.Application.Features
{
    public class PermissionService : IPermissionService
    {
        private readonly FSKDbContext context;
        public PermissionService(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));        }

        public async Task<IEnumerable<int>> GetPermissionToWorkshops(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
            return await (from u in this.context.WorkShopUsers
                          join w in this.context.WorkShops on u.WorkShopId equals w.Id
                          where
                          w.EntityStatus == EntityStatuses.Active &&
                          u.UserId.ToString() == userId
                          select w.Id).ToListAsync(cancellationToken);
            //return await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
        }
        public async Task<IEnumerable<int>> GetPermissionToProducts(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
            return await (from u in this.context.WorkShopUsers
                          join w in this.context.WorkShops on u.WorkShopId equals w.Id
                          join p in this.context.Products on w.Id equals p.WorkShopId
                          where
                          w.EntityStatus == EntityStatuses.Active &&
                          p.EntityStatus == EntityStatuses.Active &&
                          u.UserId.ToString() == userId
                          select p.Id).ToListAsync(cancellationToken);
            //var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
            //return await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);

        }
        public async Task<IEnumerable<int>> GetPermissionToOperations(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
          
            return await (from u in this.context.WorkShopUsers
                          join w in this.context.WorkShops on u.WorkShopId equals w.Id
                          join p in this.context.Products on w.Id equals p.WorkShopId
                          join o in this.context.Operations on p.Id equals o.ProductId
                          where
                          w.EntityStatus == EntityStatuses.Active &&
                          p.EntityStatus == EntityStatuses.Active &&
                          o.EntityStatus == EntityStatuses.Active &&
                          u.UserId.ToString() == userId
                          select o.Id).ToListAsync(cancellationToken);
            //var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
            //var productsId = await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);
            //return await this.context.Operations.Where(x => productsId.Contains(x.ProductId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);

        }
        public async Task<IEnumerable<int>> GetPermissionToDefects(CancellationToken cancellationToken)
        {

            var userId = this.context.GetCurrentUser();
            return await (from u in this.context.WorkShopUsers
                            join w in this.context.WorkShops on u.WorkShopId equals w.Id
                            join p in this.context.Products on w.Id equals p.WorkShopId
                            join o in this.context.Operations on p.Id equals o.ProductId
                            join d in this.context.Defects on o.Id equals d.OperationId
                            where
                            w.EntityStatus == EntityStatuses.Active &&
                            p.EntityStatus == EntityStatuses.Active &&
                            o.EntityStatus == EntityStatuses.Active &&
                            d.EntityStatus == EntityStatuses.Active &&
                            u.UserId.ToString() == userId
                          select d.Id).ToListAsync(cancellationToken);

            //var workshopIds = await this.context.WorkShopUsers.Where(x => x.UserId == userId && x.EntityStatus == EntityStatuses.Active).Select(x => x.WorkShopId).ToListAsync(cancellationToken);
            //var productIds = await this.context.Products.Where(x => workshopIds.Contains(x.WorkShopId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);
            //var operationIds = await this.context.Operations.Where(x => productIds.Contains(x.ProductId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);
            //var defectIds = await this.context.Defects.Where(x => operationIds.Contains(x.OperationId) && x.EntityStatus == EntityStatuses.Active).Select(x => x.Id).ToListAsync(cancellationToken);
        }
       
    }
}
