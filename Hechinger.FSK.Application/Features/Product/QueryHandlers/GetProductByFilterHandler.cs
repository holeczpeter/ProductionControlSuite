namespace Hechinger.FSK.Application.Features
{
    public class GetProductByFilterHandler : IRequestHandler<GetProductByFilter, IEnumerable<SelectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetProductByFilterHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<SelectModel>> Handle(GetProductByFilter request, CancellationToken cancellationToken)
        {
            var permittedProduct = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Products
                .Where(x => 
                        x.EntityStatus == EntityStatuses.Active && 
                        permittedProduct.Contains(x.WorkshopId))
                .Select(x => new SelectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                })
                .Where(x=> x.Name.StartsWith(request.Filter) || x.Code.StartsWith(request.Filter) || string.IsNullOrEmpty(request.Filter))    
                .Take(25)
                .ToListAsync(cancellationToken);
        }
    }
}
