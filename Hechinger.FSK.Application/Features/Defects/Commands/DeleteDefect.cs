namespace Hechinger.FSK.Application.Features
{
    public class DeleteDefect : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
