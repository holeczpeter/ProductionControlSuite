namespace Hechinger.FSK.Core.Entities
{
    public class Role : BaseEntity
    {
        
        public bool IsDefault { get; set; }
        public virtual ICollection<MenuRole> MenuRoles { get; set; } = new HashSet<MenuRole>();
        public virtual ICollection<User> Users { get; set; } = new HashSet<User>();
    }
}
