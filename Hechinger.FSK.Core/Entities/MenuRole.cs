namespace Hechinger.FSK.Core.Entities
{
    public class MenuRole: Entity
    {
        public virtual int MenuId { get; set; }
        public virtual Menu Menu { get; set; }
        public virtual int RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
