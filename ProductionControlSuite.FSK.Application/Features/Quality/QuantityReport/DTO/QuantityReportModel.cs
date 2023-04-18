namespace ProductionControlSuite.FSK.Application.Features
{
    
    public class QuantityOperationReportModel : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string OperationCode { get; set; }
        public int Quantity => Days != null ? Days.Select(x => x.Quantity).Sum() : 0;
        public IEnumerable<QuantityDefectReportModel> Defects { get; set; } = new List<QuantityDefectReportModel>();
        public IEnumerable<QuantityOperationDayModel> Days { get; set; } = new List<QuantityOperationDayModel>();
    }
    public class QuantityOperationDayModel : BaseModel
    {
        public int OperationId { get; set; }
        public DateTime Date { get; set; }
        public int ShiftId { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public double Ppm { get;  set; }
    }
    public class QuantityDefectReportModel : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectCode { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public DefectCategories DefectCategory { get; set; }
        
        public int Quantity => Days != null ? Days.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => Days != null ?  Days.Select(x => x.DefectQuantity).Sum() : 0;
        public double Ppm => Quantity != 0 ? Math.Ceiling((1000000 / Convert.ToDouble(Quantity)) * Convert.ToDouble(DefectQuantity)) : 0;
        public IEnumerable<QuantityDayReportModel> Days { get; set; } = new List<QuantityDayReportModel>();
    }
    public class QuantityDayReportModel : BaseModel
    {
        
        public DateTime Date { get; set; }
        public int ShiftId { get; set; }
        public int DefectQuantity { get; set; }
        public double Ppm { get;  set; }
        public int Quantity { get;  set; }
    }
}
