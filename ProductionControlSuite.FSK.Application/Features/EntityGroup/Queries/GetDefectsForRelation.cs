namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetDefectsForRelation : IRequest<IEnumerable<EntityGroupRelationModel>>
    {
        public string OperationIds { get; set; }
        public int GroupId { get; set; }
        public GetDefectsForRelation(string operationIds, int groupId)
        {
            OperationIds = operationIds;
            GroupId = groupId;
        }

        public GetDefectsForRelation()
        {

        }
    }
}
