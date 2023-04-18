namespace ProductionControlSuite.FSK.Application.Common.Models
{
    public class IntervalOption : BaseModel
    {
        public string Name { get; set; }
        public Views Value { get; set; }
        public bool IsDefault { get; set; }
        
    }
}
