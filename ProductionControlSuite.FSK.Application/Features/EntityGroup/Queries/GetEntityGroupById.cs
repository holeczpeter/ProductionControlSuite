namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetEntityGroupById : IRequest<TreeItem<EntityGroupModel>>
    {
        public int Id { get; set; }
        public GetEntityGroupById()
        {

        }
        public GetEntityGroupById(int id)
        {
            Id = id;
            
        }
    }
}
