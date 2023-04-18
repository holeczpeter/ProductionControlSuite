namespace ProductionControlSuite.FSK.Application.Features
{
    public class ChangePassword : IRequest<Result<bool>>
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
