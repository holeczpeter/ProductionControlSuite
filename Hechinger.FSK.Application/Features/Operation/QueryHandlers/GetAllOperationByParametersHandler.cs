namespace Hechinger.FSK.Application.Features
{
    public class GetAllOperationByParametersHandler : IRequestHandler<GetAllOperationByParameters, ParameterResult<OperationModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetAllOperationByParametersHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<ParameterResult<OperationModel>> Handle(GetAllOperationByParameters request, CancellationToken cancellationToken)
        {
            var permittedOperation = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            var operations = this.context.Operations
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedOperation.Contains(x.Product.WorkshopId))
                .Select(x => new OperationModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Order = x.Order,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    OperationTime = x.OperationTime,
                    Norma = x.Norma,
                    PpmGoal = x.PpmGoal,
                    ProductId = x.ProductId,
                    ProductName = x.Product.Name,
                    ProductCode = x.Product.Code,
                    HasDefect = x.Defects.Any(),
                }).FilterOperation(request.Parameters);

          
            var count = await operations.CountAsync(cancellationToken);
            var results = await operations.OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);

            return new ParameterResult<OperationModel>() { Count = count, Result = results };
        }
    }
}
