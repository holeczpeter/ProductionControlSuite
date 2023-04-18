namespace ProductionControlSuite.FSK.Application.Features
{
    public class WorkerStatisticsModel : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public IEnumerable<WorkerStatisticsItem> Items { get; set; }
    }

    public class WorkerStatisticsItem : BaseModel
    {
        public string WorkerCode { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public double Ppm { get; set; }
    }
}
