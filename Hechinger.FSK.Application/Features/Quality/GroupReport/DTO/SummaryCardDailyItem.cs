namespace Hechinger.FSK.Application.Features
{
    public class SummaryCardDailyItem : BaseModel
    {
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public DefectCategories Category { get; set; }
    }
}
