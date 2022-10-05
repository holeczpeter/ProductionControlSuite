namespace Hechinger.FSK.Core.Entities
{
    public class UserRole : Entity
    {
        public virtual int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual int RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
