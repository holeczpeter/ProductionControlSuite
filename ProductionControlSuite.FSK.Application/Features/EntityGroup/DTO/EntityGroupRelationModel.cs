namespace ProductionControlSuite.FSK.Application.Features
{
    public class EntityGroupRelationModel: BaseModel
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public int EntityGroupId { get; set; }
        public int EntityId { get; set; }
        public int ParentId { get; set; }
        public EntityTypes EntityType { get; set; }

        public bool Selected { get; set; }
    }
}
