namespace ProductionControlSuite.FSK.Core.Entities
{
    public class EntityGroup : BaseEntity
    {
        public virtual int? ParentId { get; set; }
        public virtual EntityGroup Parent { get; set; }
        public GroupTypes GroupType { get; set; }
        public int Order { get; set; }
        public int PpmGoal { get; set; }
        public virtual ICollection<EntityGroup> Children { get; set; } = new HashSet<EntityGroup>();
        public virtual ICollection<EntityGroupRelation> EntityGroupRelations { get; set; } = new HashSet<EntityGroupRelation>();
    }
}
