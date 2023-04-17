namespace Hechinger.FSK.Application.Features.Import
{
    public class SummaryCardImport : IRequest<Result<IEnumerable<ImportError>>>
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
