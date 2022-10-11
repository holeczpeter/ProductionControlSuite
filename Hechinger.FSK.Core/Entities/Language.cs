namespace Hechinger.FSK.Core.Entities
{
    public class Language : Entity
    {
        public string Name { get; set; }
        public string Code { get; set; }

        public virtual ICollection<User> Users { get; set; } = new HashSet<User>();

    }
}
