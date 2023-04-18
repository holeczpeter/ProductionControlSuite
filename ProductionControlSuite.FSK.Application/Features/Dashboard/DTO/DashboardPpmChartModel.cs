namespace ProductionControlSuite.FSK.Application.Features
{
    public class DashboardPpmChartModel : BaseModel
    {
        public IEnumerable<DashboardWorkshopPpm> Items { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
