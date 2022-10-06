namespace Hechinger.FSK.Application.Features
{
    public class AddWorkshop : IRequest<Result<bool>>
    {
        [Required]
        public string Name { get; set; }
    }
}
