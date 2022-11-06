namespace Hechinger.FSK.Application.Features
{
    public class GetUserHandler : IRequestHandler<GetUser, UserModel>
    {
        private readonly FSKDbContext context;
        public GetUserHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<UserModel> Handle(GetUser request, CancellationToken cancellationToken)
        {
            return await this.context.Users.Where(u=> u.Id == request.Id).Select(u => new UserModel()
            {
                Id = u.Id,
                Code = u.Code,
                FirstName = u.FirstName,
                LastName = u.LastName,
                FullName = u.FullName,
                RoleId = u.RoleId,
                RoleName = u.Role.Name,
                LanguageId = u.Language.Id,
                LanguageName = u.Language.Name,
                Status = u.EntityStatus,
                StatusName = u.EntityStatus.GetDescription()


            }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
