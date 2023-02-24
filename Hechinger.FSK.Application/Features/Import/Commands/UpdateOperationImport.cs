using Microsoft.AspNetCore.Http;

namespace Hechinger.FSK.Application.Features
{
    public class UpdateOperationImport : IRequest<Result<IEnumerable<ImportError>>>
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
