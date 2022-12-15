namespace Hechinger.FSK.Application.Features
{
    public class GetEntityRelationsByProducts : IRequest<IEnumerable<EntityGroupRelationTree>>
    {
        public string ProductIds { get; set; }

        public GetEntityRelationsByProducts(string productIds)
        {
            ProductIds = productIds;
        }

        public GetEntityRelationsByProducts()
        {

        }
    }
}
