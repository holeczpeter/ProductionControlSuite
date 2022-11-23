namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopByFilterHandler : IRequestHandler<GetWorkshopByFilter, IEnumerable<SelectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetWorkshopByFilterHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<SelectModel>> Handle(GetWorkshopByFilter request, CancellationToken cancellationToken)
        {
            var permittedWorkshop = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Workshops
                .Where(x =>
                        x.EntityStatus == EntityStatuses.Active &&
                        permittedWorkshop.Contains(x.Id))
                .Select(x => new SelectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                })
                .Where(x => x.Name.StartsWith(request.Filter) || x.Code.StartsWith(request.Filter) || string.IsNullOrEmpty(request.Filter))
                .Take(25)
                .ToListAsync(cancellationToken);
        }
    }
}
