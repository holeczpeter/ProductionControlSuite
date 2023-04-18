namespace ProductionControlSuite.FSK.Application.Features
{
    public class SummaryCardRequestParameters : RequestParameters
    {
        public DateTime? Date { get; set; }
        public DateTime? Created { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string OperationCode { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string UserName { get; set; }
        public string ShiftName { get; set; }
        public string ShiftTranslatedName { get; set; }
        public string Quantity { get; set; }
        public string WorkerCode { get; set; }
    }
}
