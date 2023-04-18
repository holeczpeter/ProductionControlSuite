
namespace ProductionControlSuite.FSK.Application.Features
{
    public interface IQuantityService
    {
        Task<QuantityOperationReportModel> GetByOperation(int operationId, DateTime start, DateTime end, CancellationToken cancellationToken);
    }
}