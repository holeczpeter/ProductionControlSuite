namespace Hechinger.FSK.Application.Features
{
    public class CrapCostDayModel : BaseModel
    {
        public int OperationId { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public double OperationTime { get; set; }
        public double Value { get; set; }
    }
}
