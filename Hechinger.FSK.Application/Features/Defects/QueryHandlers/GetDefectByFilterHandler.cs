namespace Hechinger.FSK.Application.Features
{
    internal class GetDefectByFilterHandler : IRequestHandler<GetDefectByFilter, IEnumerable<SelectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetDefectByFilterHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }


        public async Task<IEnumerable<SelectModel>> Handle(GetDefectByFilter request, CancellationToken cancellationToken)
        {
            var permittedDefects = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Defects
                .Where(x => x.EntityStatus == EntityStatuses.Active &&
                            permittedDefects.Contains(x.Operation.Product.WorkshopId))
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


