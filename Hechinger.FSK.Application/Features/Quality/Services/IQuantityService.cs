
namespace Hechinger.FSK.Application.Features
{
    public interface IQuantityService
    {
        Task<IEnumerable<QuantityOperationReportModel>> GetByProduct(int productId, DateTime start, DateTime end, CancellationToken cancellationToken);

        Task<QuantityOperationReportModel> GetByOperation(int operationId, DateTime start, DateTime end, CancellationToken cancellationToken);
    }
}