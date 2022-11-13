namespace Hechinger.FSK.Core.Entities
{
    public class AuditLogEntity : Entity
    {
        public long EntityId { get; set; }
        public string EntityName { get; set; }
        public virtual ICollection<AuditLogProperty> AuditLogProperties { get; set; } = new HashSet<AuditLogProperty>();
    }
}
