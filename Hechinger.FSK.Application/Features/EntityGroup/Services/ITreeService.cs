
namespace Hechinger.FSK.Application.Features
{
    public interface ITreeService
    {
        /// <summary>
        /// Hibaösszesítő fa mentése
        /// </summary>
        /// <param name="item"></param>
        /// <param name="parent"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>bool</returns>
        Task<Result<bool>> Save(TreeItem<EntityGroupModel> item, EntityGroup parent, CancellationToken cancellationToken);

        /// <summary>
        /// Hibaösszesítő fa törlése
        /// </summary>
        /// <param name="item"></param>
        /// <param name="parent"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>bool</returns>
        Task<Result<bool>> Delete(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Hibaösszesítő fa lekérdezése
        /// </summary>
        /// <param name="item"></param>
        /// <param name="parent"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>bool</returns>
        Task<IEnumerable<TreeItem<EntityGroupModel>>> GetAll(CancellationToken cancellationToken);
    }
}