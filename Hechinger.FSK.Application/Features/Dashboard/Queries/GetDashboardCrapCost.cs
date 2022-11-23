namespace Hechinger.FSK.Application.Features
{
    public class GetDashboardCrapCost : IRequest<IEnumerable<DashboardCrapCost>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetDashboardCrapCost()
        {

        }
        public GetDashboardCrapCost(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
