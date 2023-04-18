namespace ProductionControlSuite.FSK.Application.Features
{
    public class SummaryCardItemModel: BaseModel
    {
        public int Id { get; set; }

        public int DefectId { get; set; }
        public string DefectName { get; set; }
        public int Quantity { get; set; }
        public int Order { get; set; }

        public string Comment { get; set; }
        public string DefectTranslatedName { get; set; }
        public string DefectCode { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public string DefectCategoryName { get; set; }
    }
}
