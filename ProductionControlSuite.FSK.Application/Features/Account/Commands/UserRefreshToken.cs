namespace ProductionControlSuite.FSK.Application.Features
{
    public class UserRefreshToken : IRequest<Result<bool>>
    {
        public int UserId { get; set; }
        public DateTime Expiration { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
