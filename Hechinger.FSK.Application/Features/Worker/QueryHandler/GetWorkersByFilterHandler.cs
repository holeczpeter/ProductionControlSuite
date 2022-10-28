namespace Hechinger.FSK.Application.Features
{
    public class GetWorkersByFilterHandler : IRequestHandler<GetWorkersByFilter, IEnumerable<WorkerModel>>
    {
        private readonly FSKDbContext context;
        public GetWorkersByFilterHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<WorkerModel>> Handle(GetWorkersByFilter request, CancellationToken cancellationToken)
        {
            return await context.SummaryCards
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => x.WorkerCode)
                .Where(x => x.StartsWith(request.Filter) || string.IsNullOrEmpty(request.Filter))
                .GroupBy(x => x)
                .Select(x => new WorkerModel()
                {
                    WorkerCode = x.Key,
                })
                .ToListAsync();
        }
    }
}
