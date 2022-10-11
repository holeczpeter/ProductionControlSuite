namespace Hechinger.FSK.Application.Features
{
    public class UserDataModel : BaseModel
    {
        public UserInfo UserInfo { get; set; }
        public string Token { get; set; }
        public string RefreshToken{ get; set; }
        public LoginResults LoginStatus { get; set; }
    }
    public class UserInfo 
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
