namespace Hechinger.FSK.Application.Features
{
    public class GetProductsForRelationHandler : IRequestHandler<GetProductsForRelation, IEnumerable<EntityGroupRelationModel>>
    {
        private readonly FSKDbContext context;
        public GetProductsForRelationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<EntityGroupRelationModel>> Handle(GetProductsForRelation request, CancellationToken cancellationToken)
        {
            var relations = await context.EntityGroupRelations
                .Where(x => x.EntityGroupId == request.GroupId)
                .Select(g => new
                {
                    Id = g.Id,
                    GroupId = g.EntityGroupId,
                    ProductId = g.EntityId
                }).ToListAsync(cancellationToken);

            var products = await context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new ProductModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    WorkshopId = x.Workshop.Id,
                    WorkshopName = x.Workshop.Name,
                }).ToListAsync(cancellationToken);

            var results = products.Select(product =>
            {
                var currentGroup = relations.Where(x => x.ProductId == product.Id).FirstOrDefault();
                return new EntityGroupRelationModel()
                {
                    Id = currentGroup != null ? currentGroup.Id : 0,
                    Order = 0,
                    Code = product.Code,
                    Name = product.Name,
                    EntityGroupId = currentGroup != null ? currentGroup.GroupId : 0,
                    EntityId = product.Id,
                    EntityType = EntityTypes.Product,
                    ParentId = 0,
                    TranslatedName = product.TranslatedName,
                    Selected = currentGroup != null
                };
            }).ToList();
            return results;


        }
    }
}