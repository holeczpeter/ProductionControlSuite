namespace Hechinger.FSK.Application.Features
{
    public class SaveEntityGroup : IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public int ParentId { get; set; }
        public GroupTypes GroupType { get; set; }
        public IEnumerable<EntityGroupRelationModel> Relations { get; set; } = Enumerable.Empty<EntityGroupRelationModel>();
        public IEnumerable<SaveEntityGroup> Children { get; set; } =  Enumerable.Empty<SaveEntityGroup>();
        public bool Collapsed { get; set; }
        
    }
}
