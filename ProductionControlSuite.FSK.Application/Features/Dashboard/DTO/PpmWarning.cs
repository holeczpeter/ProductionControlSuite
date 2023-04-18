namespace ProductionControlSuite.FSK.Application.Features
{
    public class PpmWarning : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string OperationCode { get; set; }
        public DateTime Date { get; set; }
        public int ShiftId { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public double Ppm { get; set; }
        public int SummaryGoal { get;  set; }
    }
}
