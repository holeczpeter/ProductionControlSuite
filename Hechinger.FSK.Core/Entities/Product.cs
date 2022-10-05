namespace Hechinger.FSK.Core.Entities
{
    public class Product : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public virtual int WorkShopId { get; set; }
        public virtual WorkShop WorkShop { get; set; }
        public virtual ICollection<Operation> Operations { get; set; } = new HashSet<Operation>();
    }
}
