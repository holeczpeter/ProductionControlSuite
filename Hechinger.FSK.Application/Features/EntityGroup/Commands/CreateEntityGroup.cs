namespace Hechinger.FSK.Application.Features
{
    public class CreateEntityGroup : IRequest<Result<bool>>
    {
        public TreeItem<EntityGroupModel> Current { get; set; }
    }
}
