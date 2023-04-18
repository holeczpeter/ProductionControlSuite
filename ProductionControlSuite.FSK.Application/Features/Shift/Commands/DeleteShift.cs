namespace ProductionControlSuite.FSK.Application.Features
{
    public class DeleteShift : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
