namespace Hechinger.FSK.Application.Features
{
    public class WorkshopPpmData : BaseModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public int Ppm { get; set; }
    }
}
