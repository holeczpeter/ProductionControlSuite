namespace ProductionControlSuite.FSK.Core.Common
{
    public class Entity : IEntity
    {
        public virtual int Id { get; set; }
        public virtual DateTime Created { get; set; } 
        public virtual string Creator { get; set; }
        public virtual DateTime LastModified { get; set; }
        public virtual string LastModifier { get; set; }
        public virtual byte[] RowVersion { get; set; }
        public virtual EntityStatuses EntityStatus { get; set; } = EntityStatuses.Active;
    }
}
