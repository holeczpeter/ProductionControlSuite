namespace ProductionControlSuite.FSK.Application.Features
{
    public class DeleteRole : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
