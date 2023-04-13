namespace Hechinger.FSK.Application.Features
{
    public class PermissionService : IPermissionService
    {
        private readonly FSKDbContext context;
        public PermissionService(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));        }

        public async Task<List<int>> GetPermissionToWorkshops(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
            return await (from u in this.context.WorkshopUsers
                          join w in this.context.Workshops on u.WorkshopId equals w.Id
                          where
                          w.EntityStatus == EntityStatuses.Active &&
                          u.UserId.ToString() == userId
                          select w.Id).ToListAsync(cancellationToken);
            
        }
        public async Task<List<int>> GetPermissionToProducts(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
            return await (from u in this.context.WorkshopUsers
                          join w in this.context.Workshops on u.WorkshopId equals w.Id
                          join p in this.context.Products on w.Id equals p.WorkshopId
                          where
                          w.EntityStatus == EntityStatuses.Active &&
                          p.EntityStatus == EntityStatuses.Active &&
                          u.UserId.ToString() == userId
                          select p.Id).ToListAsync(cancellationToken);

        }
        public async Task<List<int>> GetPermissionToOperations(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
          
            return await (from u in this.context.WorkshopUsers
                          join w in this.context.Workshops on u.WorkshopId equals w.Id
                          join p in this.context.Products on w.Id equals p.WorkshopId
                          join o in this.context.Operations on p.Id equals o.ProductId
                          where
                          w.EntityStatus == EntityStatuses.Active &&
                          p.EntityStatus == EntityStatuses.Active &&
                          o.EntityStatus == EntityStatuses.Active &&
                          u.UserId.ToString() == userId
                          select o.Id).ToListAsync(cancellationToken);
            

        }
        public async Task<List<int>> GetPermissionToDefects(CancellationToken cancellationToken)
        {
            var userId = this.context.GetCurrentUser();
            return await (from u in this.context.WorkshopUsers
                            join w in this.context.Workshops on u.WorkshopId equals w.Id
                            join p in this.context.Products on w.Id equals p.WorkshopId
                            join o in this.context.Operations on p.Id equals o.ProductId
                            join d in this.context.Defects on o.Id equals d.OperationId
                            where
                            w.EntityStatus == EntityStatuses.Active &&
                            p.EntityStatus == EntityStatuses.Active &&
                            o.EntityStatus == EntityStatuses.Active &&
                            d.EntityStatus == EntityStatuses.Active &&
                            u.UserId.ToString() == userId
                          select d.Id).ToListAsync(cancellationToken);
        }
       
    }
}
