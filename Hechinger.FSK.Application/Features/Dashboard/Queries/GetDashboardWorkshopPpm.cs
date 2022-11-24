namespace Hechinger.FSK.Application.Features
{
    public class GetDashboardWorkshopPpm : IRequest<IEnumerable<DashboardWorkshopPpm>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetDashboardWorkshopPpm()
        {

        }
        public GetDashboardWorkshopPpm(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
