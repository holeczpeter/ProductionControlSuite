using Hechinger.FSK.Core.Enums;

namespace Hechinger.FSK.Core.Entities
{
    public class SummaryCard : Entity
    {
        public DateTime Date { get; set; }
        public virtual int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual int ShiftId { get; set; }
        public virtual Shift Shift { get; set; }
        public virtual int OperationId { get; set; }
        public virtual Operation Operation { get; set; }
        public string WorkerCode { get; set; }
        public string LOS { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity => SummaryCardItems.Select(x=> x.Quantity).Sum();
        public int F0 => SummaryCardItems.Where(x=>x.Defect.DefectCategory == DefectCategories.F0).Select(x => x.Quantity).Sum();
        public int F1 => SummaryCardItems.Where(x => x.Defect.DefectCategory == DefectCategories.F1).Select(x => x.Quantity).Sum();
        public int F2 => SummaryCardItems.Where(x => x.Defect.DefectCategory == DefectCategories.F2).Select(x => x.Quantity).Sum();
        public virtual ICollection<SummaryCardItem> SummaryCardItems { get; set; } = new HashSet<SummaryCardItem>();
    }
}
