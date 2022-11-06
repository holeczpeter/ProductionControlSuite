
namespace Hechinger.FSK.Application.Features
{
    public interface IPermissionService
    {
        Task<IEnumerable<int>> GetPermissionToDefects(CancellationToken cancellation);
        Task<IEnumerable<int>> GetPermissionToOperations(CancellationToken cancellation);
        Task<IEnumerable<int>> GetPermissionToProducts(CancellationToken cancellation);
        Task<IEnumerable<int>> GetPermissionToWorkshops(CancellationToken cancellation);
    }
}