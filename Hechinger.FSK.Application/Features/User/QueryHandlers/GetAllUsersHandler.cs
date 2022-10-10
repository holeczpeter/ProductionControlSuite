namespace Hechinger.FSK.Application.Features
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsers, IEnumerable<UserModel>>
    {
        private readonly FSKDbContext context;
        public GetAllUsersHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<UserModel>> Handle(GetAllUsers request, CancellationToken cancellationToken)
        {
            return await this.context.Users.Select(u => new UserModel() 
            { 
                Id = u.Id,
                Code = u.Code,
                FirstName   = u.FirstName,
                LastName = u.LastName,
                FullName = u.FullName,
                RoleId = u.UserRoles.Select(x=>x.Id).FirstOrDefault(),  
                RoleName = u.UserRoles.Select(x => x.Role.Name).FirstOrDefault(),
                Status = u.EntityStatus,
                StatusName = u.EntityStatus.GetDescription()
                

            }).ToListAsync();
        }
    }
}
