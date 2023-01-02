namespace Hechinger.FSK.Application.Features
{
    public class GetGroupReport : IRequest<GroupReportModel>
    {
        public int EntityGroupId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public Views View { get; set; }
        public GetGroupReport()
        {

        }
        public GetGroupReport(int entityGroupId, DateTime startDate, DateTime endDate, Views view)
        {
            EntityGroupId = entityGroupId;
            StartDate = startDate;
            EndDate = endDate;
            View = view;
        }
    }
}
