namespace Hechinger.FSK.Application.Features
{
    public class GetAllSummaryCardsByParametersHandler : IRequestHandler<GetAllSummaryCardsByParameters, IEnumerable<SummaryCardModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllSummaryCardsByParametersHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<SummaryCardModel>> Handle(GetAllSummaryCardsByParameters request, CancellationToken cancellationToken)
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
