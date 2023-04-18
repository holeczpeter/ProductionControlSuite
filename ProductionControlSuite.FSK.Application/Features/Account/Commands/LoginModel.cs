namespace ProductionControlSuite.FSK.Application.Features
{
    public class LoginModel : IRequest<UserDataModel>
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
