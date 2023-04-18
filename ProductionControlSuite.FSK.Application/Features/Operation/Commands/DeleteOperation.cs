namespace ProductionControlSuite.FSK.Application.Features
{
    public class DeleteOperation : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
