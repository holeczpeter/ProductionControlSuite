namespace Hechinger.FSK.Application.Features
{
    public class AddNewTreeItem: BaseModel
    {
        public TreeItem<EntityGroupModel> Parent { get; set; }

    }
}
