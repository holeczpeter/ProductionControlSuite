using Hechinger.FSK.Core.Enums;

namespace Hechinger.FSK.Core.Entities
{
    public class Defect : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public virtual int OperationId { get; set; }
        public virtual Operation Operation { get; set; }
        public int Order { get; set; }
        public virtual ICollection<SummaryCardItem> SummaryCardItems { get; set; } = new HashSet<SummaryCardItem>();

        public virtual ICollection<Picture> Pictures { get; set; } = new HashSet<Picture>();
    }
}
