namespace Hechinger.FSK.Application.Features
{
    public class UpdateSummaryCardHandler : IRequestHandler<UpdateSummaryCard, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateSummaryCardHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateSummaryCard request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var currentCard = await this.context.SummaryCards.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentCard == null)
            {
                result.Errors.Add("A hibagyűjtő nem található");
                return result;
            }
            currentCard.ShiftId = request.ShiftId;
            currentCard.OperationId = request.OperationId;
            currentCard.WorkerCode = request.Worker;
            currentCard.Date = request.Date;
            currentCard.LOS = request.Los;
            currentCard.Quantity = request.Quantity;
            currentCard.UserId = 8;

            foreach (var item in request.Items)
            {
                var currentItem = await this.context.SummaryCardItem.Where(x => x.Id == item.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
                if (currentItem == null)
                {
                    result.Errors.Add("A hibagyűjtő hiba tétele nem található");
                    return result;
                }
                currentItem.DefectId = item.DefectId;
                currentItem.Quantity = item.Quantity;
                currentItem.Comment = item.Comment;
            }

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A hibagyűjtő sikeresen módosítva";
            result.IsSuccess = true;
            return result;
        }
    }
}
