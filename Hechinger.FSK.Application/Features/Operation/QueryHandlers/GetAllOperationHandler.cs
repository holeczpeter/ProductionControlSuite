namespace Hechinger.FSK.Application.Features
{
    public class GetAllOperationHandler : IRequestHandler<GetAllOperation, IEnumerable<OperationModel>>
    {
        private readonly FSKDbContext context;
        private readonly IOperationCache cache;
        public GetAllOperationHandler(FSKDbContext context, IOperationCache cache)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }
        public async Task<IEnumerable<OperationModel>> Handle(GetAllOperation request, CancellationToken cancellationToken)
        {
            return this.cache.GetCachedOperations();
            
        }
    }
}
