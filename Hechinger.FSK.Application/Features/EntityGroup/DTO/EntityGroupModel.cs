namespace Hechinger.FSK.Application.Features
{
    public class EntityGroupModel: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public int ParentId { get; set; }
        public int Order { get; set; }
        public GroupTypes GroupType { get; set; }
        public IEnumerable<EntityGroupRelationModel> Relations { get; set; } = Enumerable.Empty<EntityGroupRelationModel>();
        public int PpmGoal { get; set; }
    }
    
}
