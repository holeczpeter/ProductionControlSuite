namespace ProductionControlSuite.FSK.Core.Entities
{
    public class EntityGroupRelation : Entity
    {
        public virtual int EntityGroupId { get; set; }

        public virtual EntityGroup EntityGroup { get; set; }

        public int EntityId { get; set; }

        public EntityTypes EntityType { get; set; } 
    }
}
