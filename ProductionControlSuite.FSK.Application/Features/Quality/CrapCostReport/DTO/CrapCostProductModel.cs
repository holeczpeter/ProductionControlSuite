namespace ProductionControlSuite.FSK.Application.Features
{
    public class CrapCostProductModel : BaseModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string ProductTranslatedName { get; set; }
        public int Quantity => Operations != null ? Operations.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => Operations != null ? Operations.Select(x => x.DefectQuantity).Sum() : 0;
        public double Value => Operations != null ? Operations.Select(x => x.Value).Sum() : 0;
        public IEnumerable<CrapCostOperationModel> Operations { get; set;}

    }
}
