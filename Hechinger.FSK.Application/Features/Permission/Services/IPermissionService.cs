
namespace Hechinger.FSK.Application.Features
{
    public interface IPermissionService
    {
        Task<IEnumerable<int>> GetPermissionToOperation(int userId, CancellationToken cancellation);
        Task<IEnumerable<int>> GetPermissionToProducts(int userId, CancellationToken cancellation);
        Task<IEnumerable<int>> GetPermissionToWorkshops(int userId, CancellationToken cancellation);
    }
}