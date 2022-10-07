namespace Hechinger.FSK.Application.Features
{
    public class GetProductHandler : IRequestHandler<GetProduct, ProductModel>
    {
        private readonly FSKDbContext context;
        public GetProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<ProductModel> Handle(GetProduct request, CancellationToken cancellationToken)
        {
            return await context.Products.Where(x => x.EntityStatus == EntityStatuses.Active && x.Id == request.Id).Select(x => new ProductModel()
            {
                Id = x.Id,
                Name = x.Name,
                Code =x.Code,
                TranslatedName = x.TranslatedName,
                WorkshopId = x.WorkShop.Id,
                WorkshopName = x.WorkShop.Name,
                Operations = x.Operations.Select(operation=> new OperationModel() 
                { 
                    Name = operation.Name,  
                    TranslatedName = operation.TranslatedName,  
                    Code = operation.Code,    
                    Norma = operation.Norma,
                    OperationTime = operation.OperationTime,    
                }),  
            }).FirstOrDefaultAsync();
        }
    }
}
