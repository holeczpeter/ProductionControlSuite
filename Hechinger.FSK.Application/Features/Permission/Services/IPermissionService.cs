
namespace Hechinger.FSK.Application.Features
{
    public interface IPermissionService
    {
        /// <summary>
        /// Hiba jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<List<int>> GetPermissionToDefects(CancellationToken cancellation);


        /// <summary>
        /// Művelet jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<List<int>> GetPermissionToOperations(CancellationToken cancellation);


        /// <summary>
        /// Termék jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<List<int>> GetPermissionToProducts(CancellationToken cancellation);


        /// <summary>
        /// Műhely jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<List<int>> GetPermissionToWorkshops(CancellationToken cancellation);
    }
}