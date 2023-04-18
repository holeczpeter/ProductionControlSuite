namespace ProductionControlSuite.FSK.Application.Features
{
    public class DeleteUser : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
    }
}
