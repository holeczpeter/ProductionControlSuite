namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsForRelationHandler : IRequestHandler<GetDefectsForRelation, IEnumerable<EntityGroupRelationModel>>
    {
        private readonly FSKDbContext context;
        public GetDefectsForRelationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<EntityGroupRelationModel>> Handle(GetDefectsForRelation request, CancellationToken cancellationToken)
        {
            if (request.OperationIds == null) return null;
            var operationIds = request.OperationIds.Split(",").Select(x => int.Parse(x));
            var group = await context.EntityGroups.Where(x => x.Id == request.GroupId).SelectMany(x => x.Children).Select(x => x.Id).ToListAsync(cancellationToken);
            
            var relations = await this.context.EntityGroupRelations
                .Where(x => (x.EntityGroupId == request.GroupId || group.Contains(x.EntityGroupId)) && x.EntityStatus == EntityStatuses.Active && x.EntityType == EntityTypes.Defect)
                .Select(x => x.EntityId).ToListAsync(cancellationToken);

            var operations = await this.context.Defects.Where(o => operationIds.Contains(o.OperationId) &&
                                                                !relations.Contains(o.Id))
                                                    .Select(o => new EntityGroupRelationModel()
                                                    {
                                                        Id = 0,
                                                        Order = o.Order,
                                                        Code = o.Code,
                                                        Name = o.Name,
                                                        EntityGroupId = 0,
                                                        EntityId = o.Id,
                                                        EntityType = EntityTypes.Defect,
                                                        ParentId = o.OperationId,
                                                        TranslatedName = o.TranslatedName,
                                                    }).OrderBy(x=>x.Order)
                                                    .ToListAsync(cancellationToken);
            return operations;

        }
    }
}
