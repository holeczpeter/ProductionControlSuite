﻿namespace ProductionControlSuite.FSK.Application.Features
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
            var card =  await context.SummaryCards.Where(card => card.Id == request.Id && card.EntityStatus == EntityStatuses.Active).Select(card =>
            new SummaryCardDetailModel()
            {
                Id = card.Id,
                Date = card.Date,
                Los = card.LOS,
                OperationId = card.OperationId,
                Quantity = card.Quantity,
                ShiftId = card.ShiftId,
                WorkerCode = card.WorkerCode,
            }).FirstOrDefaultAsync(cancellationToken);


            var defects = this.context.Defects.Where(x => x.OperationId == card.OperationId && x.EntityStatus == EntityStatuses.Active).ToList().Select(defect =>
            {
                var cardItem = this.context.SummaryCardItems.Where(x => x.DefectId == defect.Id && x.SummaryCardId == card.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefault();
                return new SummaryCardItemModel()
                {
                    Id = cardItem != null ?  cardItem.Id : 0,
                    DefectId = defect.Id,
                    DefectName = defect.Name,
                    Order = defect.Order,
                    DefectCode = defect.Code,
                    DefectCategory = defect.DefectCategory,
                    DefectCategoryName = defect.DefectCategory.GetDescription(),
                    DefectTranslatedName = !String.IsNullOrEmpty(defect.TranslatedName) ? defect.TranslatedName : defect.Name,
                    Quantity = cardItem != null ? cardItem.Quantity : 0,
                    Comment = cardItem != null ? cardItem.Comment : String.Empty,
                };
            }).ToList();
            card.Items = defects;
            return card;
        }
    }
}
