namespace Hechinger.FSK.Application.Features
{
    public class TokenRequestModel: BaseModel
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public string RefreshToken { get; set; }

        public TokenRequestModel()
        {

        }
        public TokenRequestModel(string token, int userId, string refreshToken)
        {
            this.Token = token;
            this.UserId = userId;
            this.RefreshToken = refreshToken;
        }
    }
}
