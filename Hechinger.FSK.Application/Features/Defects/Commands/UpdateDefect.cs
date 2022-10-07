namespace Hechinger.FSK.Application.Features
{
    public class UpdateDefect : IRequest<Result<bool>>
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
        public int OperationId { get; set; }
        [Required]
        public DefectCategories DefectCategory { get; set; }
    }
}
