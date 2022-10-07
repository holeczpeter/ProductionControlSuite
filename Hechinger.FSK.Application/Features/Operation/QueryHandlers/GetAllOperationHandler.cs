namespace Hechinger.FSK.Application.Features
{
    public class GetAllOperationHandler : IRequestHandler<GetAllOperation, IEnumerable<OperationModel>>
    {
        private readonly FSKDbContext context;
        public GetAllOperationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<OperationModel>> Handle(GetAllOperation request, CancellationToken cancellationToken)
        {
            return await context.Operations.Where(x => x.EntityStatus == EntityStatuses.Active).Select(x => new OperationModel()
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = x.TranslatedName,
                OperationTime=x.OperationTime,  
                Norma = x.Norma,
                ProductId = x.ProductId,    
                ProductName = x.Product.Name,
                ProductCode = x.Product.Code,

            }).ToListAsync();
        }
    }
}
