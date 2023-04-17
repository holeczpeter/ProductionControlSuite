namespace Hechinger.FSK.Application.Features.Import
{
    public class DefectImport : IRequest<Result<IEnumerable<ImportError>>>
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
