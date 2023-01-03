namespace Hechinger.FSK.Application.Features
{
    public class GetGroupReportYearlySummary : IRequest<IEnumerable<GroupReportYearlySummaryModel>>
    {
        public int EntityGroupId { get; set; }
        public int Year { get; set; }

        public GetGroupReportYearlySummary()
        {

        }
        public GetGroupReportYearlySummary(int entityGroupId, int year)
        {
            EntityGroupId = entityGroupId;
            Year = year;
        }
    }
}


