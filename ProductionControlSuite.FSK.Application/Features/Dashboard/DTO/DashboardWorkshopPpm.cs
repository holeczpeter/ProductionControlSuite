namespace ProductionControlSuite.FSK.Application.Features
{
    public class DashboardWorkshopPpm : BaseModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public double Ppm { get; set; }
        
    }
}
