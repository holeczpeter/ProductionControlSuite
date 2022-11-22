namespace Hechinger.FSK.Application.Features
{
    public class CrapCostOperationModel : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationCode { get; set; }
        public string OperationTranslatedName { get; set; }
        public int Quantity  => Days != null ? Days.Select(x => x.Quantity).Sum() : 0;
        public int DefectQuantity => Days != null ? Days.Select(x => x.DefectQuantity).Sum() : 0;
        public double Value => Days != null ? Days.Select(x => x.Value).Sum() : 0;
        public IEnumerable<CrapCostDayModel> Days { get; set; } = new List<CrapCostDayModel>();
        
    }
    
}
