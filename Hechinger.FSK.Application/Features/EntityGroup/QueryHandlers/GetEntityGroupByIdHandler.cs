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
            
            Stopwatch queres = new Stopwatch();
            queres.Start();
           
            var products = await this.context.Products.Select(relation => new EntityGroupRelationModel()
            {

                Id = relation.Id,
                Code = relation.Code,
                Name = relation.Name,
            }).AsNoTracking().ToListAsync(cancellationToken);

            var operations = await this.context.Operations.Select(relation => new EntityGroupRelationModel()
            {

                Id = relation.Id,
                Code = relation.Code,
                Name = relation.Name,
            }).AsNoTracking().ToListAsync(cancellationToken);

            var defects = await this.context.Defects.Select(relation => new EntityGroupRelationModel()
            {

                Id = relation.Id,
                Code = relation.Code,
                Name = relation.Name,
            }).AsNoTracking().ToListAsync(cancellationToken);

            Debug.WriteLine("Lekérdezések: " + queres.Elapsed.TotalMilliseconds);
            Stopwatch query = new Stopwatch();
            query.Start();
            
            var groups = this.context.EntityGroups
                        .Where(x => x.EntityStatus == EntityStatuses.Active)
                        .Include(x => x.EntityGroupRelations)
                        .AsNoTracking()
                        .ToList()
                        .Select(item => new EntityGroupModel()
                        {
                            Id = item.Id,
                            Name = item.Name,
                            ParentId = item.ParentId ?? 0,
                            TranslatedName = item.TranslatedName,
                            GroupType = item.GroupType,
                            Order = item.Order,
                            PpmGoal = item.PpmGoal,
                            Relations = item.EntityGroupRelations
                                .Where(x => x.EntityStatus == EntityStatuses.Active)
                                .Select(relation =>
                                {
                                    var entity = relation.EntityType == EntityTypes.Product ? products.FirstOrDefault(p => p.Id == relation.EntityId) :
                                        (relation.EntityType == EntityTypes.Operation ? operations.FirstOrDefault(o => o.Id == relation.EntityId) :
                                        defects.FirstOrDefault(d => d.Id == relation.EntityId));
                                    return new EntityGroupRelationModel()
                                    {

                                        Id = relation.Id,
                                        Code = entity?.Code ?? string.Empty,
                                        Name = entity?.Name ?? string.Empty,
                                        EntityGroupId = relation.EntityGroupId,
                                        EntityId = relation.EntityId,
                                        EntityType = relation.EntityType,
                                    };
                                }).ToList(),
                        }).ToList();

            query.Stop();
            Debug.WriteLine("Lekérdezés: " + query.Elapsed.TotalMilliseconds);

            Stopwatch tree = new Stopwatch();
            tree.Start();
            
            var results = groups.GenerateSubtreeCurrent(i => i.Id, i => i.ParentId, request.Id).ToList();


            tree.Stop();
            Debug.WriteLine("Fa: " + tree.Elapsed.TotalMilliseconds);

            return results.Where(x=>x.Node.Id == request.Id).FirstOrDefault();
        }
    }
}
