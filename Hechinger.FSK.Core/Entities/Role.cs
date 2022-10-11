namespace Hechinger.FSK.Core.Entities
{
    public class Role : Entity
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public bool IsDefault { get; set; }
        public virtual ICollection<MenuRole> MenuRoles { get; set; } = new HashSet<MenuRole>();
        public virtual ICollection<User> Users { get; set; } = new HashSet<User>();
    }
}
