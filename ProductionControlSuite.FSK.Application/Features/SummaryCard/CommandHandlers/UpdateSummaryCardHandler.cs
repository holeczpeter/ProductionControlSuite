﻿namespace ProductionControlSuite.FSK.Application.Features
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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var currentCard = await this.context.SummaryCards.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentCard == null)
            {
                result.Errors.Add("summaryCard.notFound");
                return result;
            }
            currentCard.ShiftId = request.ShiftId;
            currentCard.OperationId = request.OperationId;
            currentCard.WorkerCode = request.WorkerCode;
            currentCard.Date = request.Date.Date;
            currentCard.LOS = request.Los;
            currentCard.Quantity = request.Quantity;
            currentCard.UserId = request.UserId;

            foreach (var item in request.Items)
            {
                var currentItem = await this.context.SummaryCardItems.Where(x => x.Id == item.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
                if (currentItem == null)
                {
                    result.Errors.Add("summaryCard.fehlerItemNotFound");
                    return result;
                }
                currentItem.DefectId = item.DefectId;
                currentItem.Quantity = item.Quantity;
                currentItem.Comment = item.Comment;
            }

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "summaryCard.updateSuccesful";
            result.IsSuccess = true;
            return result;
        }
    }
}
