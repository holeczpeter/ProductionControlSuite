namespace Hechinger.FSK.Core.Entities
{
    public class WorkshopUser : Entity
    {
        public virtual int WorkshopId { get; set; }
        public virtual Workshop Workshop { get; set; }
        public virtual int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
