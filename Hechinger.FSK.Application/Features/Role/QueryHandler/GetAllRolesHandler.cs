namespace Hechinger.FSK.Application.Features
{
    public class GetAllRolesHandler : IRequestHandler<GetAllRoles, IEnumerable<RoleModel>>
    {
        private readonly FSKDbContext context;
        public GetAllRolesHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<RoleModel>> Handle(GetAllRoles request, CancellationToken cancellationToken)
        {
            return await this.context.Roles.Where(r=> r.EntityStatus == EntityStatuses.Active).Select(u => new RoleModel()
            {
                Id = u.Id,
                Code = u.Code,
                Name = u.Name,  
                TranslatedName = u.TranslatedName,
                IsDefault = u.IsDefault,    

            }).ToListAsync(cancellationToken);
        }
    }
    
    
}
