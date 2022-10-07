namespace Hechinger.FSK.Application.Features
{
    public class GetSummaryCardHandler : IRequestHandler<GetSummaryCard, SummaryCardDetailModel>
    {
        private readonly FSKDbContext context;
        public GetSummaryCardHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<SummaryCardDetailModel> Handle(GetSummaryCard request, CancellationToken cancellationToken)
        {
            return await context.SummaryCards.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).Select(x =>
            new SummaryCardDetailModel()
            {
                Id = request.Id,
                Date = x.Date,
                Los = x.LOS,
                OperationId = x.OperationId,
                Quantity = x.Quantity,
                ShiftId = x.ShiftId,
                Worker = x.WorkerCode,
                Items = x.SummaryCardItems.Select(x => new SummaryCardItemModel()
                {
                    Id = x.Id,
                    DefectId = x.DefectId,
                    DefectName = x.Defect.Name,
                    Quantity = x.Quantity,
                    Comment = x.Comment
                }),
            }).FirstOrDefaultAsync();
        }
    }
}
