namespace Hechinger.FSK.Application.Features.Dashboard.DTO
{
    public class ProductionInfoChartModel: BaseModel
    {
        public ProductionInfo Item { get; set; }
        public IntervalModel Interval { get; set; }
    }
}
