namespace Hechinger.FSK.Application.Features
{
    internal class GetSummaryCardsCountHandler : IRequestHandler<GetProductsCount, int>
    {
        private readonly FSKDbContext context;
        public GetSummaryCardsCountHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<int> Handle(GetProductsCount request, CancellationToken cancellationToken)
        {

            return await this.context.SummaryCards.CountAsync();
        }
    }
}

