namespace Hechinger.FSK.Application.Features
{
    public class TreeService : ITreeService
    {
        private readonly FSKDbContext context;
        public TreeService(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
      
        public async Task<Result<bool>> Save(SaveEntityGroup item, EntityGroup parent, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var currentEntity = await this.context.EntityGroups.Where(x => x.Id == item.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentEntity == null) currentEntity = new EntityGroup();
            currentEntity.Name = item.Name;
            currentEntity.TranslatedName = item.TranslatedName;
            currentEntity.Parent = parent;
            currentEntity.ParentId = item.ParentId;
            currentEntity.GroupType = item.GroupType;

            var currentEntityState = this.context.Entry(currentEntity).State;
            if (currentEntityState != EntityState.Modified && currentEntityState != EntityState.Unchanged) await this.context.EntityGroups.AddAsync(currentEntity, cancellationToken);

            //Törlés
            var currentRelations = currentEntity != null ? currentEntity.EntityGroupRelations.Where(x => x.EntityId == currentEntity.Id && x.EntityStatus == EntityStatuses.Active).ToList() : new List<EntityGroupRelation>();
            var deletedRelationIds = currentRelations.Select(x => x.Id).Except(item.Relations.Select(x => x.Id));
            var deletedRelations = currentRelations.Where(x => deletedRelationIds.Contains(x.Id));
            foreach (var deletedRelation in deletedRelations)
            {
                deletedRelation.EntityStatus = EntityStatuses.Deleted;
            }
            foreach (var rel in item.Relations)
            {
                var currentRelation = await this.context.EntityGroupRelations.Where(c => c.Id == rel.Id).FirstOrDefaultAsync(cancellationToken);
                if (currentRelation == null) currentRelation = new EntityGroupRelation();
                currentRelation.EntityGroup = currentEntity;
                currentRelation.EntityId = rel.EntityId;
                currentRelation.EntityType = rel.EntityType;
                var currentRelationState = this.context.Entry(currentEntity).State;
                if (currentRelationState != EntityState.Modified && currentRelationState != EntityState.Unchanged) await this.context.EntityGroupRelations.AddAsync(currentRelation, cancellationToken);
            }

            //Törlés
           
            var currentChildrens = await this.context.EntityGroups.Where(x => x.ParentId == currentEntity.Id && x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
            var deletedChildrenIds = currentChildrens.Select(x => x.Id).Except(item.Children.Select(x => x.Id));
            var deletedChildrens = currentChildrens.Where(x => deletedChildrenIds.Contains(x.Id));
            foreach (var deletedChild in deletedChildrens)
            {
                deletedChild.EntityStatus = EntityStatuses.Deleted;
            }
            foreach (var i in item.Children)
            {
                await Save(i, currentEntity, cancellationToken);
            }
            await this.context.SaveChangesAsync(cancellationToken);
            return result;

        }
        public async Task<IEnumerable<TreeItem<EntityGroupModel>>> GetAll(CancellationToken cancellationToken)
        {

            var groups = await this.context.EntityGroups.Where(x => x.EntityStatus == EntityStatuses.Active).Select(item => new EntityGroupModel()
            {
                Id = item.Id,
                Name = item.Name,
                ParentId = item.ParentId != null ? item.ParentId.Value : 0,
                TranslatedName = item.TranslatedName,
                Relations = item.EntityGroupRelations.Where(x => x.EntityStatus == EntityStatuses.Active)
                                                     .Select(relation => new EntityGroupRelationModel()
                                                     {
                                                         EntityGroupId = relation.EntityGroupId,
                                                         EntityId = relation.EntityId,
                                                         EntityType = relation.EntityType,
                                                     }).ToList(),
            }).ToListAsync(cancellationToken);

            var result = groups.GenerateTree(i => i.Id, i => i.ParentId);
            return result;

        }
    }
    

}
