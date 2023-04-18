namespace ProductionControlSuite.FSK.Core.Entities
{
    public class Language : BaseEntity
    {
        public virtual ICollection<User> Users { get; set; } = new HashSet<User>();
    }
}
