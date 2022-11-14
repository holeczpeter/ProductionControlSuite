namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsCountHandler : IRequestHandler<GetDefectsCount, int>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;

        public GetDefectsCountHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<int> Handle(GetDefectsCount request, CancellationToken cancellationToken)
        {
            var permittedDefects = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await this.context.Defects
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedDefects.Contains(x.Operation.Product.WorkshopId))
                .CountAsync(cancellationToken);
        }
    }
}
