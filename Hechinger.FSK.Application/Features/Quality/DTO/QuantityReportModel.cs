namespace Hechinger.FSK.Application.Features
{
    
    public class QuantityOperationReportModel : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string OperationCode { get; set; }
        public int Quantity => Days.Select(x => x.Quantity).Sum();
        public IEnumerable<QuantityDefectReportModel> Defects { get; set; }
        public IEnumerable<QuantityDayReportModel> Days { get; set; }
    }
    public class QuantityDefectReportModel : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectCode { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public int PPM =>  Days.Select(x=>x.PPM).Sum();
        public int DefectQuantity => Days.Select(x => x.DefectQuantity).Sum();
        public IEnumerable<QuantityDayReportModel> Days { get; set; }
    }
    public class QuantityDayReportModel : BaseModel
    {
        
        public DateTime Date { get; set; }
        public int ShiftId { get; set; }
        public int DefectQuantity { get; set; }
        public int Quantity { get; set; }
        public int PPM { get; internal set; }
    }
    //public class QuantityWeekReportModel : BaseModel
    //{
    //    public int Year { get; set; }
    //    public int Month { get; set; }
    //    public int Week { get; set; }
    //    public int DefectQuantity { get; set; }
    //    public int Quantity { get; set; }
        
    //}

}
