namespace ProductionControlSuite.FSK.Application.Features
{
    public class OperationPrintModel: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public IEnumerable<DefectPrintModel> Defects { get; set; } = new List<DefectPrintModel>();

    }
    public class DefectPrintModel: BaseModel 
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public DefectCategories DefectCategory { get; set; }
    }
}
