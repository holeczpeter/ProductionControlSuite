namespace Hechinger.FSK.Application.Features
{
    public class WorkshopProductionChartModel: BaseModel
    {
        public WorkshopProduction Item { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
