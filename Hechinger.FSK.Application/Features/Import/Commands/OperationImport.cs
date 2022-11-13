using Microsoft.AspNetCore.Http;

namespace Hechinger.FSK.Application.Features.Import.CommandHandler
{
    public class OperationImport : IRequest<Result<IEnumerable<ImportError>>>
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
