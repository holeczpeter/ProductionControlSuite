namespace Hechinger.FSK.Application.Features
{
    public class GetAllProductHandler : IRequestHandler<GetAllProducts, IEnumerable<ProductModel>>
    {
        private readonly FSKDbContext context;
        public GetAllProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<ProductModel>> Handle(GetAllProducts request, CancellationToken cancellationToken)
        {
            return await context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new ProductModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = x.TranslatedName,
                    WorkshopId = x.WorkShop.Id,
                    WorkshopName = x.WorkShop.Name,

                })
                .FilterProduct(request.Parameters)
                .OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);
        }
    }
}