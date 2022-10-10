namespace Hechinger.FSK.Application.Features
{
    public class GetUsersExceptRoleHandler : IRequestHandler<GetUserExceptRole, IEnumerable<RoleUserItem>>
    {
        private readonly FSKDbContext context;
        public GetUsersExceptRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<RoleUserItem>> Handle(GetUserExceptRole request, CancellationToken cancellationToken)
        {
            return await this.context.UserRoles.Where(x => x.RoleId != request.RoleId)
                .Select(x => new RoleUserItem() 
                { 
                    Id= x.User.Id,
                    Code = x.User.Code,
                    FullName = x.User.FullName, 
                }).ToListAsync();
        }
    }
}
