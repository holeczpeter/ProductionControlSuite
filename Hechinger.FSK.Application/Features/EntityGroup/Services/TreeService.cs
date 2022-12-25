namespace Hechinger.FSK.Application.Features
{
    public class TreeService : ITreeService
    {
        private readonly FSKDbContext context;
        public TreeService(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Result<bool>> Save(TreeItem<EntityGroupModel> item, EntityGroup parent, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var currentEntity = await this.context.EntityGroups.Where(x => x.Id == item.Node.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentEntity == null) currentEntity = new EntityGroup();
            currentEntity.Name = item.Node.Name;
            currentEntity.TranslatedName = item.Node.TranslatedName;
            currentEntity.Parent = parent;
            currentEntity.ParentId = item.Node.ParentId == 0 ? null : item.Node.ParentId;
            currentEntity.GroupType = item.Node.GroupType;

            var currentEntityState = this.context.Entry(currentEntity).State;
            if (currentEntityState != EntityState.Modified && currentEntityState != EntityState.Unchanged) await this.context.EntityGroups.AddAsync(currentEntity, cancellationToken);

            //Törlés
            var currentRelations = currentEntity != null ? currentEntity.EntityGroupRelations.Where(x =>  x.EntityStatus == EntityStatuses.Active).ToList() : new List<EntityGroupRelation>();
            var deletedRelationIds = currentRelations.Select(x => x.Id).Except(item.Node.Relations.Select(x => x.Id));
            var deletedRelations = currentRelations.Where(x => deletedRelationIds.Contains(x.Id));
            foreach (var deletedRelation in deletedRelations)
            {
                deletedRelation.EntityStatus = EntityStatuses.Deleted;
            }
            foreach (var rel in item.Node.Relations)
            {
                var currentRelation = await this.context.EntityGroupRelations.Where(c => c.Id == rel.Id).FirstOrDefaultAsync(cancellationToken);
                if (currentRelation == null) currentRelation = new EntityGroupRelation();
                currentRelation.EntityGroup = currentEntity;
                currentRelation.EntityId = rel.EntityId;
                currentRelation.EntityType = rel.EntityType;
                var currentRelationState = this.context.Entry(currentRelation).State;
                if (currentRelationState != EntityState.Modified && currentRelationState != EntityState.Unchanged) await this.context.EntityGroupRelations.AddAsync(currentRelation, cancellationToken);
            }

            //Törlés

            var currentChildrens = await this.context.EntityGroups.Where(x => x.ParentId == currentEntity.Id && x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
            var deletedChildrenIds = currentChildrens.Select(x => x.Id).Except(item.Children.Select(x => x.Node.Id));
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
        public async Task<Result<bool>> Delete(int id, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var currentEntity = await this.context.EntityGroups.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (currentEntity == null)
            {
                result.Errors.Add("A hibaösszesítő nem található");
                return result;
            }
            currentEntity.EntityStatus = EntityStatuses.Deleted;

            var currentRelations = currentEntity != null ? currentEntity.EntityGroupRelations.ToList() : new List<EntityGroupRelation>();
            foreach (var deletedRelation in currentRelations)
            {
                deletedRelation.EntityStatus = EntityStatuses.Deleted;
            }

            var currentChildrens = await this.context.EntityGroups.Where(x => x.ParentId == currentEntity.Id).ToListAsync(cancellationToken);
            foreach (var deletedChild in currentChildrens)
            {
                deletedChild.EntityStatus = EntityStatuses.Deleted;
            }
            foreach (var i in currentChildrens)
            {
                await Delete(i.Id, cancellationToken);
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

        public async Task<Result<bool>> CreateRelations(TreeItem<EntityGroupModel> item, EntityGroup parent, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var currentEntity = await this.context.EntityGroups.Where(x => x.Id == item.Node.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentEntity == null) currentEntity = new EntityGroup();
            currentEntity.Name = item.Node.Name;
            currentEntity.TranslatedName = item.Node.TranslatedName;
            currentEntity.Parent = parent;
            currentEntity.ParentId = item.Node.ParentId == 0 ? null : item.Node.ParentId;
            currentEntity.GroupType = item.Node.GroupType;

            var currentEntityState = this.context.Entry(currentEntity).State;
            if (currentEntityState != EntityState.Modified && currentEntityState != EntityState.Unchanged) await this.context.EntityGroups.AddAsync(currentEntity, cancellationToken);

            
            foreach (var rel in item.Node.Relations)
            {
                var currentRelation = await this.context.EntityGroupRelations.Where(c => c.Id == rel.Id).FirstOrDefaultAsync(cancellationToken);
                if (currentRelation == null) currentRelation = new EntityGroupRelation();
                currentRelation.EntityGroupId = rel.EntityGroupId;
                currentRelation.EntityId = rel.EntityId;
                currentRelation.EntityType = rel.EntityType;
                var currentRelationState = this.context.Entry(currentRelation).State;
                if (currentRelationState != EntityState.Modified && currentRelationState != EntityState.Unchanged) await this.context.EntityGroupRelations.AddAsync(currentRelation, cancellationToken);

                var operations = await this.context.Operations
                    .Where(x => x.ProductId == rel.EntityId)
                    .GroupBy(x=>x.Order)
                    .Select(x=> new
                    {
                        Order = x.Key,
                        Items = x.Select(i => new EntityGroupRelationModel()
                        {
                            Id = 0,  
                            Code = i.Code,
                            EntityId = i.Id,
                            EntityGroupId = 0,
                        }).ToList()
                    }).ToListAsync(cancellationToken);

            }
            

            //Törlés

            
            foreach (var i in item.Children)
            {
                
            }
            await this.context.SaveChangesAsync(cancellationToken);
            return result;
        }
    }


}
