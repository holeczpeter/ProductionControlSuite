namespace Hechinger.FSK.Application.Features
{
    public class CreateRelationsForTree : IRequest<Result<bool>>
    {
        public TreeItem<EntityGroupModel> Current { get; set; }
    }
}
