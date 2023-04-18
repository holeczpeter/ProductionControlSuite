namespace ProductionControlSuite.FSK.Application.Features
{
    public class GroupReportYearlySummaryModel : BaseModel
    {
        public int Year { get; set; }
        public string ProductName { get; set; }
        public string ProductTranslatedName { get; set; }
        public string ProductCode { get; set; }
        public DefectCategories Category { get; set; }
        public string CategoryName { get; set; }
        public IEnumerable<GroupReportYearlySummaryItem> Items { get; set; } = new List<GroupReportYearlySummaryItem>();
        public int Goal { get; set; }
        public double Avarage => Math.Round(Items.Select(x => x.Value).Average(), 2);
    }
}
