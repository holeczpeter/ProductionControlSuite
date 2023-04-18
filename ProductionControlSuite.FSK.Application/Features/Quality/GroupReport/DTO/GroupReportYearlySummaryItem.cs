namespace ProductionControlSuite.FSK.Application.Features
{
    public class GroupReportYearlySummaryItem : BaseModel
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public double Value { get; set; }
    }
}
