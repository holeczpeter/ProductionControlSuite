namespace Hechinger.FSK.Application.Features
{
    public class AddSummaryCardHandler : IRequestHandler<AddSummaryCard, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddSummaryCardHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddSummaryCard request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var current = new SummaryCard()
            {
                ShiftId = request.ShiftId,
                OperationId = request.OperationId,
                WorkerCode= request.Worker,
                Date = request.Date.Date,
                LOS = request.Los,
                Quantity = request.Quantity,
                UserId = request.UserId,

            };
            await this.context.AddAsync(current, cancellationToken);
            foreach (var item in request.Items)
            {
                var currentItem = new SummaryCardItem()
                {
                    DefectId = item.DefectId,
                    Quantity = item.Quantity,
                    Comment = item.Comment,
                    SummaryCard = current,

                };
                await this.context.AddAsync(currentItem, cancellationToken);
            }

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A hibagyűjtő sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
