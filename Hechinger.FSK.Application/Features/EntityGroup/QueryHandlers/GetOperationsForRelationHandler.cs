namespace Hechinger.FSK.Application.Features
{
    public class GetOperationsForRelationHandler : IRequestHandler<GetOperationsForRelation, IEnumerable<EntityGroupRelationModel>>
    {
        private readonly FSKDbContext context;
        public GetOperationsForRelationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<EntityGroupRelationModel>> Handle(GetOperationsForRelation request, CancellationToken cancellationToken)
        {
            if (request.ProductIds == null) return null;
            var productIds = request.ProductIds.Split(",").Select(x => int.Parse(x));
            var group = await context.EntityGroups.Where(x => x.Id == request.GroupId).SelectMany(x => x.Children).Select(x => x.Id).ToListAsync(cancellationToken);
            //var relations = await this.context.EntityGroupRelations
            //    .Where(x => (x.EntityGroupId == request.GroupId || group.Contains(x.EntityGroupId)) && x.EntityStatus == EntityStatuses.Active && x.EntityType == EntityTypes.Operation)
            //    .Select(x => x.EntityId).ToListAsync(cancellationToken);
            
            var operations = await this.context.Operations.Where(o => productIds.Contains(o.ProductId) )
            //&&
                                                                //!relations.Contains(o.Id))
                                                    .Select(o => new EntityGroupRelationModel()
                                                    {
                                                        Id = 0,
                                                        Order = o.Order,
                                                        Code = o.Code,
                                                        Name = o.Name,
                                                        EntityGroupId = 0,
                                                        EntityId = o.Id,
                                                        EntityType = EntityTypes.Operation,
                                                        ParentId = o.ProductId,
                                                        TranslatedName = o.TranslatedName,
                                                    }).ToListAsync(cancellationToken);
            return operations;

        }
    }
}
