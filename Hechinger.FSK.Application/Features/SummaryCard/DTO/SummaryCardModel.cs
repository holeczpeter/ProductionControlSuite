namespace Hechinger.FSK.Application.Features
{
    public class SummaryCardModel : BaseModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public DateTime Created { get; set; }
        public string ShiftName { get; set; }
        public string ShiftTranslatedName { get; set; }
        public string UserName { get; set; }
        public string WorkerName { get; set; }
        public string OperationCode { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public int Quantity { get; set; }
       
    }
}
