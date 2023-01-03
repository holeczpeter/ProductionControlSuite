namespace Hechinger.FSK.Application.Features
{
    public class GetEntityGroupByIdHandler : IRequestHandler<GetEntityGroupById, TreeItem<EntityGroupModel>>
    {
        private readonly FSKDbContext context;
        public GetEntityGroupByIdHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<TreeItem<EntityGroupModel>> Handle(GetEntityGroupById request, CancellationToken cancellationToken)
        {

            var groups = this.context.EntityGroups.Where(x => x.EntityStatus == EntityStatuses.Active).ToList().Select(item => new EntityGroupModel()
            {
                Id = item.Id,
                Name = item.Name,
                ParentId = item.ParentId != null ? item.ParentId.Value : 0,
                TranslatedName = item.TranslatedName,
                GroupType = item.GroupType,
                Order = item.Order,
                PpmGoal  = item.PpmGoal,
                Relations = item.EntityGroupRelations.Where(x => x.EntityStatus == EntityStatuses.Active)
                                                    .ToList()
                                                    .Select(relation =>
                                                    {
                                                        var entity = relation.EntityType == EntityTypes.Product ? this.context.Products.Where(p => p.Id == relation.EntityId).Select(p => new { Code = p.Code, Name = p.Name }).FirstOrDefault() :
                                                                     (relation.EntityType == EntityTypes.Operation ? this.context.Operations.Where(o => o.Id == relation.EntityId).Select(o => new { Code = o.Code, Name = o.Name }).FirstOrDefault() :
                                                                    this.context.Defects.Where(d => d.Id == relation.EntityId).Select(d => new { Code = d.Code, Name = d.Name }).FirstOrDefault());
                                                        return new EntityGroupRelationModel()
                                                        {

                                                            Id = relation.Id,
                                                            Code = entity != null ? entity.Code : String.Empty,
                                                            Name = entity != null ? entity.Name : String.Empty,
                                                            EntityGroupId = relation.EntityGroupId,
                                                            EntityId = relation.EntityId,
                                                            EntityType = relation.EntityType,
                                                        };
                                                    }).ToList(),
            });

            var results = groups.GenerateTree(i => i.Id, i => i.ParentId);
            foreach (var item in results)
            {
                var result = TreeHelper.FindNode(item, request.Id);
                if (result != null) 
                {
                    return result;
                }
                
            }
            return null;
        }
    }
}
