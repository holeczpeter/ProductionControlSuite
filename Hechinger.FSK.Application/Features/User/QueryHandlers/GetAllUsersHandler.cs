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
                RoleId = u.Role.Id,  
                RoleName = u.Role.Name,
                LanguageId = u.Language.Id,
                LanguageName = u.Language.Name,
                Status = u.EntityStatus,
                StatusName = u.EntityStatus.GetDescription()
                

            }).ToListAsync();
        }
    }
}
