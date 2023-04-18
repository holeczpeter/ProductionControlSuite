namespace ProductionControlSuite.FSK.Application.Features
{
    public class UserTokenInfo : BaseModel
    {
        public int UserId { get; set; }
        public DateTime Expiration { get; set; }
        public string RefreshToken { get; set; }
    }
}
