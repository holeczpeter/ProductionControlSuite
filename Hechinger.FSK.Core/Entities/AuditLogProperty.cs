namespace Hechinger.FSK.Core.Entities
{
    public class AuditLogProperty: Entity
    {
        public virtual AuditLogEntity AuditLogEntity { get; set; }
        public virtual int AuditLogEntityId { get; set; }
        public string PropertyName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string Action { get; set; }
    }
}
