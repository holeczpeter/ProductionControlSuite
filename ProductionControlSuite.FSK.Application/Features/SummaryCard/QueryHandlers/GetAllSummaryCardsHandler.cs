﻿namespace ProductionControlSuite.FSK.Application.Features
{
    internal class GetAllSummaryCardsHandler : IRequestHandler<GetAllSummaryCards, IEnumerable<SummaryCardModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllSummaryCardsHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<SummaryCardModel>> Handle(GetAllSummaryCards request, CancellationToken cancellationToken)
        {
            var permittedOperations = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await this.context.SummaryCards.Where(x => x.EntityStatus == EntityStatuses.Active && permittedOperations.Contains(x.Operation.Product.WorkshopId))
                .Select(x => new SummaryCardModel()
                {
                    Id = x.Id,
                    Date = x.Date,
                    Created = x.Created,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,
                    OperationTranslatedName = !String.IsNullOrEmpty(x.Operation.TranslatedName) ? x.Operation.TranslatedName : x.Operation.Name,
                    UserName = x.User.FullName,
                    ShiftName = x.Shift.Name,
                    ShiftTranslatedName = !String.IsNullOrEmpty(x.Shift.TranslatedName) ? x.Shift.TranslatedName : x.Shift.Name,
                    Quantity = x.Quantity,
                    WorkerCode = x.WorkerCode,
                })
                .ToListAsync(cancellationToken);
        }
    }
}
