namespace Hechinger.FSK.Application.Features
{
    internal class GetOperationsCountHandler : IRequestHandler<GetOperationsCount, int>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetOperationsCountHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));

        }
      
        public async Task<int> Handle(GetOperationsCount request, CancellationToken cancellationToken)
        {
            var permittedOperation = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Operations.Where(x => x.EntityStatus == EntityStatuses.Active && permittedOperation.Contains(x.Product.WorkshopId)).CountAsync(cancellationToken);
        }
    }
}
