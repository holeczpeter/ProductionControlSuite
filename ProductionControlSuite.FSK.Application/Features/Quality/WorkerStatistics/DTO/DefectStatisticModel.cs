namespace ProductionControlSuite.FSK.Application.Features
{
    public class DefectStatisticModel : BaseModel
    {
        public string WorkerCode { get; set; }
        public string OperationCode {get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public IEnumerable<DefectStatisticsItem> Items { get; set; }
    }
    public class DefectStatisticsItem : BaseModel
    {
        public string DefectCode { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public string DefectCategoryName { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public double Ppm { get; set; }
    }
}
