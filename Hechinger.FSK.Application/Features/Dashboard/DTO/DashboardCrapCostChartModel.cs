namespace Hechinger.FSK.Application.Features.Dashboard.DTO
{
    public class DashboardCrapCostChartModel : BaseModel
    {
        public IEnumerable<DashboardCrapCost> Items { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
