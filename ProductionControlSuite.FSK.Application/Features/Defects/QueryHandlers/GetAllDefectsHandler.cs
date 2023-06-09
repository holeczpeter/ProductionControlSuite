﻿
namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllDefectsHandler : IRequestHandler<GetAllDefects, IEnumerable<DefectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;  
     
        public GetAllDefectsHandler(FSKDbContext context, IPermissionService permissionService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }
        public async Task<IEnumerable<DefectModel>> Handle(GetAllDefects request, CancellationToken cancellationToken)
        {
            
            var permittedDefects = await this.permissionService.GetPermissionToWorkshops(cancellationToken);
            return await context.Defects
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
                .ToListAsync(cancellationToken);

        }
    }
}
