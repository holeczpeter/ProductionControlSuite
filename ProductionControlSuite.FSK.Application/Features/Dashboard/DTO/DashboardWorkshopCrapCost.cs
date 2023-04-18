namespace ProductionControlSuite.FSK.Application.Features
{
    public class DashboardWorkshopCrapCost : BaseModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public double Value { get; set; }
    }
}
