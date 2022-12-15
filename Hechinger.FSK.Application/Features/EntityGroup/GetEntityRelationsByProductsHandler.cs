namespace Hechinger.FSK.Application.Features
{
    public class GetEntityRelationsByProductsHandler : IRequestHandler<GetEntityRelationsByProducts, IEnumerable<EntityGroupRelationTree>>
    {
        private readonly FSKDbContext context;
        public GetEntityRelationsByProductsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<EntityGroupRelationTree>> Handle(GetEntityRelationsByProducts request, CancellationToken cancellationToken)
        {
            var productIds = request.ProductIds.Split(",").Select(x => int.Parse(x));
            
            
            var products = await this.context.Products.Where(p => productIds.Contains(p.Id))
               .Select(p => new EntityGroupRelationTree()
               {
                   Node = new EntityGroupRelationModel() 
                   {
                       Id = 0,
                       Order = 0,
                       Code = p.Code,
                       Name = p.Name,
                       EntityGroupId = 0,
                       EntityId = p.Id,
                       EntityType = EntityTypes.Product,
                       ParentId = 0,
                       TranslatedName = p.TranslatedName,  
                       
                   },
                   Children = p.Operations.Select(o=> new EntityGroupRelationTree() 
                   {
                       Node = new EntityGroupRelationModel()
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
                       },
                       Children = o.Defects.Select(d => new EntityGroupRelationTree()
                       {
                           Node = new EntityGroupRelationModel()
                           {
                               Id = 0,
                               Order = d.Order,
                               Code = d.Code,
                               Name = d.Name,
                               EntityGroupId = 0,
                               EntityId = d.Id,
                               EntityType = EntityTypes.Defect,
                               ParentId = d.OperationId,
                               TranslatedName = d.TranslatedName,
                           },

                       }).ToList()  
                   }).ToList() 
                  
               }).ToListAsync(cancellationToken);
            
            return products;

        }
    }
}
