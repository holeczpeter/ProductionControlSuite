using Hechinger.FSK.Core.Enums;

namespace Hechinger.FSK.Core.Entities
{
    public class SummaryCard : Entity
    {
        public DateTime Date { get; set; }
        //public DateOnly DateOnly => DateOnly.FromDateTime(Date);
        public virtual int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual int ShiftId { get; set; }
        public virtual Shift Shift { get; set; }
        public virtual int OperationId { get; set; }
        public virtual Operation Operation { get; set; }
        public string WorkerCode { get; set; }
        public string LOS { get; set; }
        public int Quantity { get; set; }
        public virtual ICollection<SummaryCardItem> SummaryCardItems { get; set; } = new HashSet<SummaryCardItem>();
    }
}
