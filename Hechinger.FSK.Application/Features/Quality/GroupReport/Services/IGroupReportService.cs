
namespace Hechinger.FSK.Application.Features
{
    public interface IGroupReportService
    {
        Task<GroupReportModel> Get(GetGroupReport request, CancellationToken cancellationToken);
        Task<IEnumerable<GroupReportYearlySummaryModel>> GetYearlySummary(GetGroupReportYearlySummary request, CancellationToken cancellationToken);
    }
}