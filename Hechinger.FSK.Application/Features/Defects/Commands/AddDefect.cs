namespace Hechinger.FSK.Application.Features
{
    public class AddDefect : IRequest<Result<bool>>
    {
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
