using System.ComponentModel.DataAnnotations.Schema;

namespace Hechinger.FSK.Core.Entities
{
    public class AuditLogProperty : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public virtual AuditLogEntity AuditLogEntity { get; set; }
        public virtual int AuditLogEntityId { get; set; }
        public string PropertyName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string Action { get; set; }
        public virtual DateTime Created { get; set; } = DateTime.Now;
        public virtual string Creator { get; set; }
        public virtual DateTime LastModified { get; set; } = DateTime.Now;
        public virtual string LastModifier { get; set; }
        public virtual byte[] RowVersion { get; set; }
    }
}
