namespace Hechinger.FSK.Application.Features
{
    public class GetAllWorkshopHandler : IRequestHandler<GetAllWorkshops, IEnumerable<WorkshopModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllWorkshopHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<WorkshopModel>> Handle(GetAllWorkshops request, CancellationToken cancellationToken)
        {
            var permittedWorkShops = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.WorkShops
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedWorkShops.Contains(x.Id))
                .Select(x => new WorkshopModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    TranslatedName = x.TranslatedName,
                })
                .ToListAsync(cancellationToken);
        }
    }
}
