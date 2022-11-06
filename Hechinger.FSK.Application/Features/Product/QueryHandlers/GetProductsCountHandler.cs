namespace Hechinger.FSK.Application.Features
{
    public class GetProductsCountHandler : IRequestHandler<GetProductsCount, int>
    {
        private readonly FSKDbContext context;
        public GetProductsCountHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<int> Handle(GetProductsCount request, CancellationToken cancellationToken)
        {

            return await this.context.Products.CountAsync(cancellationToken);
        }
    }
}
