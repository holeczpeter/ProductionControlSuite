namespace Hechinger.FSK.Core.Entities
{
    public class SummaryCardItem : Entity
    {
        public virtual int DefectId { get; set; }
        public virtual Defect Defect { get; set; }
        public virtual int SummaryCardId { get; set; }
        public virtual SummaryCard SummaryCard { get; set; }

    }
}
