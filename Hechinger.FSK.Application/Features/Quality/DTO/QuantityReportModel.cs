namespace Hechinger.FSK.Application.Features
{
    public class QuantityProductReportModel : BaseModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductTranslatedName { get; set; }

        public IEnumerable<QuantityOperationReportModel> Operations { get; set; }
    }
    public class QuantityOperationReportModel : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }

        public IEnumerable<QuantityDefectReportModel> Defects { get; set; }
    }
    public class QuantityDefectReportModel : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }

        public IEnumerable<QuantityDayReportModel> Days { get; set; }
    }
    public class QuantityDayReportModel : BaseModel
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public IEnumerable<QuantityShiftReportModel> Shifts { get; set; }
    }
    public class QuantityShiftReportModel : BaseModel
    {
        public int Id { get; set; }
        public int ShiftId { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public int PPM { get; set; }

    }
}
