
namespace Hechinger.FSK.Application.Features
{
    public interface IPermissionService
    {
        /// <summary>
        /// Hiba jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<IEnumerable<int>> GetPermissionToDefects(CancellationToken cancellation);


        /// <summary>
        /// Művelet jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<IEnumerable<int>> GetPermissionToOperations(CancellationToken cancellation);


        /// <summary>
        /// Termék jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<IEnumerable<int>> GetPermissionToProducts(CancellationToken cancellation);


        /// <summary>
        /// Műhely jogosultság
        /// </summary>
        /// <param name="cancellation"></param>
        /// <returns></returns>
        Task<IEnumerable<int>> GetPermissionToWorkshops(CancellationToken cancellation);
    }
}