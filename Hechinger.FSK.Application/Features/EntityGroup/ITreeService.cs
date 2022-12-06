
namespace Hechinger.FSK.Application.Features
{
    public interface ITreeService
    {
        Task<Result<bool>> Save(SaveEntityGroup item, EntityGroup parent, CancellationToken cancellationToken);
       
    }
}