namespace Hechinger.FSK.Core.Common
{
    public class BaseEntity : IEntity
    {
        public virtual string TranslatedName { get; set; }
        public virtual DateTime Created { get; set; } = DateTime.Now;
        public virtual string Creator { get; set; }
        public virtual DateTime LastModified { get; set; } = DateTime.Now;
        public virtual string LastModifier { get; set; }
        public virtual byte[] RowVersion { get; set; }
        public virtual EntityStatuses EntityStatus { get; set; } = EntityStatuses.Active;

    }
}
