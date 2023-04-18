namespace ProductionControlSuite.FSK.Core.Entities
{
    public class Defect : BaseEntity
    {
     
        public DefectCategories DefectCategory { get; set; }
        public virtual int OperationId { get; set; }
        public virtual Operation Operation { get; set; }
        public int Order { get; set; }
        public virtual ICollection<SummaryCardItem> SummaryCardItems { get; set; } = new HashSet<SummaryCardItem>();
        public virtual ICollection<Picture> Pictures { get; set; } = new HashSet<Picture>();
    }
}
