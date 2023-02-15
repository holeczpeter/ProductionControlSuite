namespace Hechinger.FSK.Application.Features
{
    public class ChangePasswordByAdminHandler : IRequestHandler<ChangePasswordByAdmin, Result<bool>>
    {
        private readonly FSKDbContext context;

        public ChangePasswordByAdminHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Result<bool>> Handle(ChangePasswordByAdmin request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();

            var code = request.Code.Trim().ToLower();
            var currentUser = await this.context.Users.Where(x => x.Code.ToLower() == request.Code && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentUser == null)
            {
                result.IsSuccess = false;
                result.Message = "user.NotFound";
                return result;
            }
           
            var salt = Salt.Create();
            var hash = Hash.Create(request.NewPassword, salt);
            bool isValid = Hash.Validate(request.NewPassword, salt, hash);


            currentUser.Password = hash;
            currentUser.Salt = salt;
            currentUser.IsTemporary = true;
            currentUser.ChangePass = DateTime.Now;

            await this.context.SaveChangesAsync(cancellationToken);

            result.IsSuccess = true;
            result.Message = "account.changePassSuccesful";

            return result;
        }
    }
}
