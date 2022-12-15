namespace Hechinger.FSK.Application.Features
{
    public class GetEntityRelationsByProducts : IRequest<IEnumerable<EntityGroupRelationTree>>
    {
        public string ProductIds { get; set; }
        public int GroupId { get; set; }
        public GetEntityRelationsByProducts(string productIds, int groupId)
        {
            ProductIds = productIds;
            GroupId = groupId;
        }

        public GetEntityRelationsByProducts()
        {

        }
    }
}
