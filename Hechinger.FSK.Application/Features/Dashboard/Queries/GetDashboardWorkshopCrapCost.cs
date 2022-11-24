namespace Hechinger.FSK.Application.Features
{
    public class GetDashboardWorkshopCrapCost : IRequest<IEnumerable<DashboardWorkshopCrapCost>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetDashboardWorkshopCrapCost()
        {

        }
        public GetDashboardWorkshopCrapCost(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
