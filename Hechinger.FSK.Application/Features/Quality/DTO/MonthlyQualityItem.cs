namespace Hechinger.FSK.Application.Features
{
    public class MonthlyQualityItem : BaseModel
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int Value { get; set; }
    }
}
