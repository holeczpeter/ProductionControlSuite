namespace Hechinger.FSK.Core.Entities
{
    public class Operation : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public virtual int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }
        public virtual ICollection<Defect> Defects { get; set; } = new HashSet<Defect>();
        public virtual ICollection<SummaryCard> SummaryCards { get; set; } = new HashSet<SummaryCard>();
    }
}
