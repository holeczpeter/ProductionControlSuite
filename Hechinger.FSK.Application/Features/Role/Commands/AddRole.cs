namespace Hechinger.FSK.Application.Features
{
    public class AddRole : IRequest<Result<bool>>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public bool IsDefault { get; set; }
    }
}
