namespace Hechinger.FSK.Application.Features
{
    public class GetOperationsByProductHandler : IRequestHandler<GetOperationsByProduct, IEnumerable<OperationModel>>
    {
        private readonly FSKDbContext context;
        public GetOperationsByProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<OperationModel>> Handle(GetOperationsByProduct request, CancellationToken cancellationToken)
        {
            return await context.Operations.Where(x => x.ProductId == request.ProductId && x.EntityStatus == EntityStatuses.Active).Select(x => new OperationModel()
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                OperationTime = x.OperationTime,
                Norma = x.Norma,
                ProductId = x.ProductId,
                ProductName = x.Product.Name,
                ProductCode = x.Product.Code,

            }).ToListAsync();
        }
    }
}
