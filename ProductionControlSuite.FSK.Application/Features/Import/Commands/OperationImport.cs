namespace ProductionControlSuite.FSK.Application.Features.Import
{
    public class OperationImport : IRequest<Result<IEnumerable<ImportError>>>
    {
        [Required]
        public IFormFile File { get; set; }
    }
}
