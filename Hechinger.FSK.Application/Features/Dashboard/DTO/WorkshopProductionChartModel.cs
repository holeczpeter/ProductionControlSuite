namespace Hechinger.FSK.Application.Features.Dashboard.DTO
{
    public class WorkshopProductionChartModel: BaseModel
    {
        public WorkshopProduction Item { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
