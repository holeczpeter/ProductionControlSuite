using Hechinger.FSK.Application.Common;

namespace Hechinger.FSK.Application.Features
{
    public class ChangePasswordHandler : IRequestHandler<ChangePassword, Result<bool>>
    {
        private readonly FSKDbContext context;

        public ChangePasswordHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Result<bool>> Handle(ChangePassword request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var code = request.Code.Trim().ToLower();
            var currentUser = await this.context.Users.Where(x => x.Code.ToLower() == request.Code && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentUser == null)
            {
                result.IsSuccess = false;
                result.Message = "A felhasználó nem található";
                return result;
            }
            bool isValidOldPassword = Hash.Validate(request.OldPassword, currentUser.Salt, currentUser.Password);
            if (!isValidOldPassword)
            {
                result.IsSuccess = false;
                result.Message = "A megadott jelszó nem megfelelő";
                return result;
            }
            var salt = Salt.Create();
            var hash = Hash.Create(request.NewPassword, salt);
            bool isValid = Hash.Validate(request.NewPassword, salt, hash);


            currentUser.Password = hash;
            currentUser.Salt = salt;
            currentUser.IsTemporary = false;
            currentUser.ChangePass = DateTime.Now;

            await this.context.SaveChangesAsync(cancellationToken);

            result.IsSuccess = true;
            result.Message = "A jelszó változtatás sikeres";

            return result;
        }
    }
}
