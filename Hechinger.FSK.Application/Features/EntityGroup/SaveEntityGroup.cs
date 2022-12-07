namespace Hechinger.FSK.Application.Features
{
    public class SaveEntityGroup : IRequest<Result<bool>>
    {
        public TreeItem<EntityGroupModel> Current { get; set; }
    }
}
