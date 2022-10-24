namespace Hechinger.FSK.Application.Features
{
    internal class GetOperationsCountHandler : IRequestHandler<GetOperationsCount, int>
    {
        private readonly FSKDbContext context;
        public GetOperationsCountHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<int> Handle(GetOperationsCount request, CancellationToken cancellationToken)
        {

            return await this.context.Operations.CountAsync();
        }
    }
}
