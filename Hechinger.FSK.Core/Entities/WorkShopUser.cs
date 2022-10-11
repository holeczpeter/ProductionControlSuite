namespace Hechinger.FSK.Core.Entities
{
    public class WorkShopUser : Entity
    {
        public virtual int WorkShopId { get; set; }
        public virtual WorkShop WorkShop { get; set; }
        public virtual int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
