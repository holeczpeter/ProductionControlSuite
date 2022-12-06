namespace Hechinger.FSK.Application.Features
{
    public class EditTreeItem : BaseModel
    {
        public IEnumerable<TreeItem<EntityGroupModel>> Tree { get; set; }
        public TreeItem<EntityGroupModel> Current { get; set; }

    }
}
