namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetProductsForRelation : IRequest<IEnumerable<EntityGroupRelationModel>>
    {
        public string Filter { get; set; }
        public int GroupId { get; set; }
        public GetProductsForRelation(int groupId, string filter)
        {
            GroupId = groupId;
            Filter = filter;    
        }

        public GetProductsForRelation()
        {

        }
    }
}
