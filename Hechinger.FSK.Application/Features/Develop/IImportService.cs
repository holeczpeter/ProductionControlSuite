
namespace Hechinger.FSK.Application.Features
{
    public interface IImportService
    {
       
        Task<bool> ImportOperations(CancellationToken cancellationToken);
        Task<bool> ImportFehlers(CancellationToken cancellationToken);
        Task<bool> ImportCards(CancellationToken cancellationToken);
    }
}