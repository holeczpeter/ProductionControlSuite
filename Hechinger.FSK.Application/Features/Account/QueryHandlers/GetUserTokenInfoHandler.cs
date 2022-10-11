namespace Hechinger.FSK.Application.Features
{
    public class GetUserTokenInfoHandler : IRequestHandler<GetUserTokenInfo, UserTokenInfo>
    {
        private readonly FSKDbContext context;
        public GetUserTokenInfoHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context)); 
        }
        public async Task<UserTokenInfo> Handle(GetUserTokenInfo request, CancellationToken cancellationToken)
        {
            return await this.context.Users.Where(x=>x.Id == request.UserId && x.EntityStatus == EntityStatuses.Active).Select(user=> 
            new UserTokenInfo() 
            { 
                UserId = user.Id,
                RefreshToken = user.RefreshToken,
                Expiration = user.ExpiryDate
            
            }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
