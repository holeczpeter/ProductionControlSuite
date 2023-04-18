namespace ProductionControlSuite.FSK.Application.Features
{
    public class CrapCostOperationModel : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationCode { get; set; }
        public string OperationTranslatedName { get; set; }
        public double OperationTime { get; set; }
        public int Quantity  => Days != null ? Days.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => Days != null ? Days.Select(x => x.DefectQuantity).Sum() : 0;
        public double Value => Days != null ? Math.Round(Days.Select(x => x.Value).Sum(), 2) : 0;
        public IEnumerable<CrapCostDayModel> Days { get; set; } = new List<CrapCostDayModel>();
        
    }
    
}
