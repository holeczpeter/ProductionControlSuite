namespace Hechinger.FSK.Application.Features
{
    public class CrapCostWorkshopModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public int Quantity => Products != null ? Products.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => Products != null ? Products.Select(x => x.DefectQuantity).Sum() : 0;
        public double Value => Products != null ? Products.Select(x => x.Value).Sum() : 0;
        IEnumerable<CrapCostProductModel> Products { get; set; }
    }
}
