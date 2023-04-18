namespace ProductionControlSuite.FSK.Application.Features
{
    public class WorkshopProduction : BaseModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public IEnumerable<ProductionDayInfo> Days { get; set; } =  new List<ProductionDayInfo>();
    }
    public class ProductionDayInfo : BaseModel
    {
        public int WorkshopId { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
    }
}
