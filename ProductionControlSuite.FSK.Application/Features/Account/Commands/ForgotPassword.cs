namespace ProductionControlSuite.FSK.Application.Features
{
    public class ForgotPassword : IRequest<Result<bool>>
    {
        [Required]
        public string Code { get; set; }
    }
}
