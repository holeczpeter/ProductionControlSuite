namespace Hechinger.FSK.Application.Features
{
    public class GroupReportModel: BaseModel
    {
        public IEnumerable<OperationItem> Items { get; set; }
    }

    public class OperationItem : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string OperationCode { get; set; }
        public int Quantity => Defects != null ? Defects.Select(x => x.Quantity).Sum() : 0;
        public IEnumerable<DefectItem> Defects { get; set; } = new List<DefectItem>();
        public IEnumerable<WeekItem> WeekItems { get; set; } = new List<WeekItem>();
    }
    
    public class DefectItem : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectCode { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public int Quantity => WeekItems != null ? WeekItems.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => WeekItems != null ? WeekItems.Select(x => x.DefectQuantity).Sum() : 0;
        public double Ppm => Quantity != 0 ? Math.Ceiling((1000000 / Convert.ToDouble(Quantity)) * Convert.ToDouble(DefectQuantity)) : 0;
        public IEnumerable<WeekItem> WeekItems { get; set; } = new List<WeekItem>();
    }
    public class WeekItem : BaseModel
    {
        public int WeekNumber { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public int DefectQuantity { get; set; }
        public int Quantity { get; set; }
        public double Ppm { get; set; }

    }
   
}
