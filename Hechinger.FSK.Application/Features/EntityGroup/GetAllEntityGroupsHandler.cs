namespace Hechinger.FSK.Application.Features
{
    internal class GetAllEntityGroupsHandler : IRequestHandler<GetAllEntityGroups, IEnumerable<TreeItem<EntityGroupModel>>>
    {
        private readonly FSKDbContext context;
        public GetAllEntityGroupsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<TreeItem<EntityGroupModel>>> Handle(GetAllEntityGroups request, CancellationToken cancellationToken)
        {
         
            var groups = await this.context.EntityGroups.Where(x => x.EntityStatus == EntityStatuses.Active).Select(item => new EntityGroupModel()
            {
                Id = item.Id,
                Name = item.Name,  
                ParentId = item.ParentId != null ? item.ParentId.Value : 0,   
                TranslatedName = item.TranslatedName,   
                GroupType = item.GroupType,
                Relations = item.EntityGroupRelations.Where(x=>x.EntityStatus == EntityStatuses.Active)
                                                     .Select(relation=> new EntityGroupRelationModel() 
                                                     {
                                                         Id = relation.Id,
                                                         EntityGroupId = relation.EntityGroupId,    
                                                         EntityId  = relation.EntityId, 
                                                         EntityType = relation.EntityType,
                                                     }).ToList(),
            }).ToListAsync(cancellationToken);

            var result = groups.GenerateTree(i => i.Id, i => i.ParentId);
            return result;

        }
    }
}

