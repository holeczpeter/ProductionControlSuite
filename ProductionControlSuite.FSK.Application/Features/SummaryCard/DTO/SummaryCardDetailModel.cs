namespace ProductionControlSuite.FSK.Application.Features
{
    public class SummaryCardDetailModel : BaseModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string WorkerCode { get; set; }
        public int OperationId { get; set; }
        public int Quantity { get; set; }
        public string Los { get; set; }
        public int ShiftId { get; set; }
        public IEnumerable<SummaryCardItemModel> Items { get; set; }
    }
}
