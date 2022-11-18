namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsByOperationHandler : IRequestHandler<GetDefectsByOperation, IEnumerable<DefectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public GetDefectsByOperationHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<DefectModel>> Handle(GetDefectsByOperation request, CancellationToken cancellationToken)
        {
            var permittedDefects = await this.permissionService.GetPermissionToWorkshops(cancellationToken);

            return await context.Defects
                .Where(x => x.OperationId == request.OperationId &&
                            x.EntityStatus == EntityStatuses.Active &&
                             permittedDefects.Contains(x.Operation.Product.WorkshopId))
                .Select(x => new DefectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Order = x.Order,  
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    DefectCategory = x.DefectCategory,
                    OperationId = x.OperationId,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,

                }).OrderBy(x=>x.Order).ToListAsync();
        }
    }
}
