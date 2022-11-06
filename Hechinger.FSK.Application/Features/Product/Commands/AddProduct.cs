namespace Hechinger.FSK.Application.Features
{
    public class AddProduct : IRequest<Result<int>>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public int WorkshopId { get; set; }
    }
}
