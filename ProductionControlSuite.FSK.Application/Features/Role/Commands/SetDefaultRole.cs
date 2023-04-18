namespace ProductionControlSuite.FSK.Application.Features
{
    public class SetDefaultRole : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
    }
}
