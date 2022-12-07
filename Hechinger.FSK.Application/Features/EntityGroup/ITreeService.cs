
namespace Hechinger.FSK.Application.Features
{
    public interface ITreeService
    {
        Task<Result<bool>> Save(TreeItem<EntityGroupModel> item, EntityGroup parent, CancellationToken cancellationToken);
        Task<Result<bool>> Delete(int id, CancellationToken cancellationToken);
    }
}