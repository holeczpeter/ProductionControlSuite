namespace Hechinger.FSK.Application.Features
{
    public class DeleteProduct : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
