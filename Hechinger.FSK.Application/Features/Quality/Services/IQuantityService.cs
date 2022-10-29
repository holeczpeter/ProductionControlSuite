
namespace Hechinger.FSK.Application.Features
{
    public interface IQuantityService
    {
        Task<QuantityProductReportModel> Get(int productId, DateTime start, DateTime end, CancellationToken cancellationToken);
    }
}