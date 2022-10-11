using Hechinger.FSK.Application.Common;

namespace Hechinger.FSK.Application.Features
{
    public class LoginHandler : IRequestHandler<LoginModel, UserDataModel>
    {
        private readonly FSKDbContext context;
        public LoginHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<UserDataModel> Handle(LoginModel request, CancellationToken cancellationToken)
        {
            var result = new UserDataModel() { UserInfo = new UserInfo() };
            var code = request.Code.Trim().ToLower();
            var currentUser = await this.context.Users.Where(x => x.Code.ToLower() == code).FirstOrDefaultAsync();
            if (currentUser == null || currentUser.EntityStatus != EntityStatuses.Active)
            {
                result.LoginStatus = LoginResults.NotExistUser;
                return result;
            }

            bool isValid = Hash.Validate(request.Password, currentUser.Salt, currentUser.Password);
            if (!isValid)
            {
                result.LoginStatus = LoginResults.IsNotValidPassword;
                return result;
            }
            result.LoginStatus = currentUser.IsTemporary ? LoginResults.IsTemporaryPassword : LoginResults.Success;
            result.UserInfo = new UserInfo()
            {
                Code = currentUser.Code,
                Name = currentUser.FullName,
            };
            return result;
        }
    }
}
