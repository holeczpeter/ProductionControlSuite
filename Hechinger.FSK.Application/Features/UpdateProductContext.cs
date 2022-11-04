namespace Hechinger.FSK.Application.Features
{
    public class UpdateProductContext : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public int WorkshopId { get; set; }

        public IEnumerable<UpdateOperationContext> Operations { get; set; }
    }
}
