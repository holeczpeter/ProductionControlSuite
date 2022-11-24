using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Application
{
    public class DashboardPpmChartModel : BaseModel
    {
        public IEnumerable<DashboardWorkshopPpm> Items { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
