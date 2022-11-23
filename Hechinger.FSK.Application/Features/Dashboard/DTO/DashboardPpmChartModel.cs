using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Application
{
    public class DashboardPpmChartModel : BaseModel
    {
        public IEnumerable<DashboardPpm> Items { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
