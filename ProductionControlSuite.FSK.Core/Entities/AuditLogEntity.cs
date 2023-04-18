using System.ComponentModel.DataAnnotations.Schema;

namespace ProductionControlSuite.FSK.Core.Entities
{
    public class AuditLogEntity : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public long EntityId { get; set; }
        public string EntityName { get; set; }
        public virtual DateTime Created { get; set; } = DateTime.Now;
        public virtual string Creator { get; set; }
        public virtual DateTime LastModified { get; set; } = DateTime.Now;
        public virtual string LastModifier { get; set; }
        public virtual byte[] RowVersion { get; set; }
        public virtual ICollection<AuditLogProperty> AuditLogProperties { get; set; } = new HashSet<AuditLogProperty>();
    }
}
