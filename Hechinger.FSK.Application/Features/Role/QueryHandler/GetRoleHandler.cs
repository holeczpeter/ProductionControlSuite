namespace Hechinger.FSK.Application.Features
{
    public class GetRoleHandler : IRequestHandler<GetRole, RoleDetailModel>
    {
        private readonly FSKDbContext context;
        public GetRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<RoleDetailModel> Handle(GetRole request, CancellationToken cancellationToken)
        {
            return await this.context.Roles.Where(r => r.Id == request.Id && r.EntityStatus == EntityStatuses.Active).Select(r => new RoleDetailModel()
            {
                Id = r.Id,
                Name = r.Name,
                Code = r.ShortName,
                TranslatedName = r.TranslatedName,
                IsDefault = r.IsDefault,
                Users = r.UserRoles.Select(u => new RoleUserItem()
                {
                    Id = u.Id,
                    Code = u.User.Code,
                    FullName = u.User.FullName,
                })

            }).FirstOrDefaultAsync();
        }
    }
}
