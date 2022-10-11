namespace Hechinger.FSK.Application.Features
{
    public class RefreshTokenHandler : IRequestHandler<UserRefreshToken, Result<bool>>
    {
        private readonly FSKDbContext context;
        public async Task<Result<bool>> Handle(UserRefreshToken request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Token frissítés nem sikerült").SetIsSuccess(false).Build();
           
            var currentUser = await this.context.Users.Where(x => x.Id == request.UserId).FirstOrDefaultAsync(cancellationToken);
            currentUser.RefreshToken = request.RefreshToken;
            currentUser.ExpiryDate = request.Expiration;

            await  this.context.SaveChangesAsync(cancellationToken);
            result.Message = "A token frissítés sikerült";
            result.IsSuccess = true;

            return result;
        }
    }
}
