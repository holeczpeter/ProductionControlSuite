namespace Hechinger.FSK.Application.Features
{
    public class AddNewTreeItem: BaseModel
    {
        public IEnumerable<TreeItem<EntityGroupModel>> Tree { get; set; }
        public TreeItem<EntityGroupModel> Parent { get; set; }

    }
}
