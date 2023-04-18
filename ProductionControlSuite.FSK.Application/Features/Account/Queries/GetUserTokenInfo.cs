namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetUserTokenInfo : IRequest<UserTokenInfo>
    {
        public int UserId { get; set; }
        public GetUserTokenInfo()
        {

        }
        public GetUserTokenInfo(int userId) => this.UserId = userId;
       
    }
}
