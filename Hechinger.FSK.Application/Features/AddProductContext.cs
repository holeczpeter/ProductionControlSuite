namespace Hechinger.FSK.Application.Features
{
    public class AddProductContext : IRequest<Result<bool>>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public int WorkshopId { get; set; }

        public IEnumerable<AddOperationContext> Operations { get; set; }
    }

}
