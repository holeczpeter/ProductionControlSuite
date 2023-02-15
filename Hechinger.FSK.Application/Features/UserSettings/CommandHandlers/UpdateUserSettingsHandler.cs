namespace Hechinger.FSK.Application.Features
{
    public class UpdateUserSettingsHandler : IRequestHandler<UpdateUserSettings, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateUserSettingsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateUserSettings request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var user = await this.context.Users.Where(x=>x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (user == null)
            {
                result.Errors.Add("user.notFound");
                return result;
            }
            
            user.PageSize = request.PageSize;
            user.LanguageId = request.LanguageId;
            user.AvatarType = request.AvatarType;

            await context.SaveChangesAsync(cancellationToken);

            result.Message = "succesfulSave";
            result.IsSuccess = true;
            return result;
        }
    }
}
