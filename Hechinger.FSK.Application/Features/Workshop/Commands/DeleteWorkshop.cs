namespace Hechinger.FSK.Application.Features
{
    public class DeleteWorkshop : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
