using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Core.Entities
{
    public class AuditLogEntity : Entity
    {
        public long EntityId { get; set; }
        public string EntityName { get; set; }
        public virtual ICollection<AuditLogProperty> AuditLogProperties { get; set; } = new HashSet<AuditLogProperty>();
    }
}
