
namespace Hechinger.FSK.Application.Features
{
    public class GetAllDefectByParametersHandler : IRequestHandler<GetAllDefectByParameters, ParameterResult<DefectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;  
     
        public GetAllDefectByParametersHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<ParameterResult<DefectModel>> Handle(GetAllDefectByParameters request, CancellationToken cancellationToken)
        {

            var permittedDefects = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            var defects = this.context.Defects
                .Where(x => x.EntityStatus == EntityStatuses.Active && permittedDefects.Contains(x.Operation.Product.WorkshopId))
                .Select(x => new DefectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    Order = x.Order,
                    TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                    DefectCategory = x.DefectCategory,
                    DefectCategoryName = x.DefectCategory.GetDescription(),
                    OperationId = x.OperationId,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,

                })
                .FilterDefect(request.Parameters);

           
            var count = await defects.CountAsync(cancellationToken);
            var results = await defects.OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);

            return new ParameterResult<DefectModel>() { Count = count, Result = results };
        }
    }
}
