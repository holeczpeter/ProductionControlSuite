namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllWorkerHandler : IRequestHandler<GetAllWorker, IEnumerable<WorkerModel>>
    {
        private readonly FSKDbContext context;
        public GetAllWorkerHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<WorkerModel>> Handle(GetAllWorker request, CancellationToken cancellationToken)
        {

            return await context.SummaryCards
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => x.WorkerCode)
                .OrderBy(x => x)
                .GroupBy(x => x)
                .Select(x => new WorkerModel()
                {
                    WorkerCode = x.Key,
                }).ToListAsync(cancellationToken);
        }
    }
}
