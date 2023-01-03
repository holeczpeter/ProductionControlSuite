namespace Hechinger.FSK.Application.Features
{
    public class GroupReportModel: BaseModel
    {
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public int PpmGoal { get; set; }
        public Views View { get; set; }
        public IEnumerable<OperationItem> Items { get; set; }
    }

    public class OperationItem : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string OperationCode { get; set; }
        public string OperationCodes { get; set; }
        public int Quantity => PeriodItems != null ? PeriodItems.Select(x => x.Quantity).Sum() : 0;
        public IEnumerable<DefectItem> Defects { get; set; } = new List<DefectItem>();
        public IEnumerable<PeriodItem> PeriodItems { get; set; } = new List<PeriodItem>();
        public int Order { get; internal set; }
    }
    
    public class DefectItem : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectCode { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public int Quantity => PeriodItems != null ? PeriodItems.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => PeriodItems != null ? PeriodItems.Select(x => x.DefectQuantity).Sum() : 0;
        public double Ppm => Quantity != 0 ? Math.Ceiling((1000000 / Convert.ToDouble(Quantity)) * Convert.ToDouble(DefectQuantity)) : 0;
        public IEnumerable<PeriodItem> PeriodItems { get; set; } = new List<PeriodItem>();
        public DefectCategories DefectCategory { get; internal set; }
        public object Order { get; set; }
    }
    public class PeriodItem : BaseModel
    {
        public int PeriodNumber { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public int DefectQuantity { get; set; }
        public int Quantity { get; set; }
        public double Ppm { get; set; }

    }
    
   
}
