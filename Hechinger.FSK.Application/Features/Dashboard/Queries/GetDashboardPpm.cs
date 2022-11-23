namespace Hechinger.FSK.Application.Features
{
    public class GetDashboardPpm : IRequest<IEnumerable<DashboardPpm>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetDashboardPpm()
        {

        }
        public GetDashboardPpm(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
