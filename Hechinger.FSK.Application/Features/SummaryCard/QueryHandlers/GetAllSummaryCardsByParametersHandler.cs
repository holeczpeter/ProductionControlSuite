namespace Hechinger.FSK.Application.Features
{
    public class GetAllSummaryCardsByParametersHandler : IRequestHandler<GetAllSummaryCardsByParameters, ParameterResult<SummaryCardModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllSummaryCardsByParametersHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<ParameterResult<SummaryCardModel>> Handle(GetAllSummaryCardsByParameters request, CancellationToken cancellationToken)
        {
            var result = new ParameterResult<SummaryCardModel>() { Count = 0, Result = new List<SummaryCardModel>() };
            var permittedOperations = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            var filtered = this.context.SummaryCards.Where(x =>
                            x.EntityStatus == EntityStatuses.Active &&
                            x.Date.Date >= request.Parameters.StartDate.Date && x.Date.Date <= request.Parameters.EndDate.Date.Date &&
                            permittedOperations.Contains(x.Operation.Product.WorkshopId))
                .Select(x => new SummaryCardModel()
                {
                    Id = x.Id,
                    Date = x.Date,
                    Created = x.Created,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,
                    OperationTranslatedName = !String.IsNullOrEmpty(x.Operation.TranslatedName) ? x.Operation.TranslatedName : x.Operation.Name,
                    UserName = x.User.LastName + " " + x.User.FirstName,
                    ShiftName = x.Shift.Name,
                    ShiftTranslatedName = !String.IsNullOrEmpty(x.Shift.TranslatedName) ? x.Shift.TranslatedName : x.Shift.Name,
                    Quantity = x.Quantity,
                    WorkerCode = x.WorkerCode,
                }).FilterSummaryCard(request.Parameters);

            result.Count = await filtered.CountAsync(cancellationToken);
            result.Result = await filtered
                .OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToArrayAsync(cancellationToken);



            return result;
        }
    }
}
