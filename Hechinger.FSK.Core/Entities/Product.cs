namespace Hechinger.FSK.Core.Entities
{
    public class Product : BaseEntity
    {
        public virtual int WorkshopId { get; set; }
        public virtual Workshop Workshop { get; set; }
        public virtual ICollection<Operation> Operations { get; set; } = new HashSet<Operation>();
    }
}
