namespace ProductionControlSuite.FSK.Application.Features.Import
{
    public class UpdateOperationImport : IRequest<Result<IEnumerable<ImportError>>>
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
