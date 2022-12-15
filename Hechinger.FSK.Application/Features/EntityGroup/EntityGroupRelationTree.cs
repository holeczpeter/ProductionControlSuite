namespace Hechinger.FSK.Application.Features
{
    public class EntityGroupRelationTree: BaseModel
    {
        public EntityGroupRelationModel Node { get; set; }    

        public List<EntityGroupRelationTree> Children { get; set; } = new List<EntityGroupRelationTree>();

        public bool Collapsed => Children != null && Children.Any();
    }
}
