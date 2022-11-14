namespace Hechinger.FSK.Application.Features
{
    internal class GetSummaryCardsCountHandler : IRequestHandler<GetProductsCount, int>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetSummaryCardsCountHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<int> Handle(GetProductsCount request, CancellationToken cancellationToken)
        {
            var permittedOperations = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await this.context.SummaryCards
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedOperations.Contains(x.Operation.Product.WorkshopId))
                .CountAsync(cancellationToken);
        }
    }
}

