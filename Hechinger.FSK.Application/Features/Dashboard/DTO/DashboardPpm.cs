namespace Hechinger.FSK.Application.Features
{
    public class DashboardPpm : BaseModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public int Ppm { get; set; }
        
    }
}
