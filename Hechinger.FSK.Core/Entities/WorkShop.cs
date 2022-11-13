namespace Hechinger.FSK.Core.Entities
{
    public class Workshop : BaseEntity
    {
        public virtual ICollection<Product> Products { get; set; } = new HashSet<Product>();
        public virtual ICollection<WorkshopUser> Users { get; set; } = new HashSet<WorkshopUser>();
    }
}
