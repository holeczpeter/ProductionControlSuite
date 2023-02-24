namespace Hechinger.FSK.Application.Features
{
    public class GetOperationsByProductHandler : IRequestHandler<GetOperationsByProduct, IEnumerable<OperationModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetOperationsByProductHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<OperationModel>> Handle(GetOperationsByProduct request, CancellationToken cancellationToken)
        {
            var permittedOperation = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Operations.Where(x => x.ProductId == request.ProductId &&
                                                       x.EntityStatus == EntityStatuses.Active &&
                                                       permittedOperation.Contains(x.Product.WorkshopId))
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
                                               Status = x.EntityStatus,
                                               StatusName = x.EntityStatus.GetDescription(),
                                               HasDefect = x.Defects.Any(),
                                           })
                                           .OrderBy(x => x.Order)
                                           .ToListAsync(cancellationToken);
        }
    }
}
