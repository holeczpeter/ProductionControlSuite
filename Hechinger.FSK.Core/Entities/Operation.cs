namespace Hechinger.FSK.Core.Entities
{
    public class Operation : BaseEntity
    {
       
        public virtual int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }
        public int Order { get; set; }
        public int ComponentQuantity { get; set; }
        public int PpmGoal { get; set; }
        public string DefectCataglogLink { get; set; }
        public virtual ICollection<Defect> Defects { get; set; } = new HashSet<Defect>();
        public virtual ICollection<SummaryCard> SummaryCards { get; set; } = new HashSet<SummaryCard>();
       
    }
}
