namespace Hechinger.FSK.Application.Features
{
    public class GetAllSummaryCardHandler : IRequestHandler<GetAllSummaryCards, IEnumerable<SummaryCardModel>>
    {
        private readonly FSKDbContext context;
        public GetAllSummaryCardHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<SummaryCardModel>> Handle(GetAllSummaryCards request, CancellationToken cancellationToken)
        {
            return await this.context.SummaryCards.Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new SummaryCardModel()
                {
                    Id = x.Id,
                    Date = x.Date,
                    Created = x.Created,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,   
                    UserName = x.User.FullName,
                    ShiftName = x.Shift.Name,   
                    Quantity = x.Quantity,
                    WorkerName = x.WorkerCode,
                })
                .FilterSummaryCard(request.Parameters)
                .OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);
        }
    }
}
