namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetOperationsForRelation : IRequest<IEnumerable<EntityGroupRelationModel>>
    {
        public string ProductIds { get; set; }
        public int GroupId { get; set; }
        public GetOperationsForRelation(string productIds, int groupId)
        {
            ProductIds = productIds;
            GroupId = groupId;
        }

        public GetOperationsForRelation()
        {

        }
    }
}
