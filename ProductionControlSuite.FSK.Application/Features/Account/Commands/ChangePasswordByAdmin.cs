namespace ProductionControlSuite.FSK.Application.Features
{
    public class ChangePasswordByAdmin : IRequest<Result<bool>>
    {
        [Required]
        public string Code { get; set; }
        
        [Required]
        public string NewPassword { get; set; }
    }
}


