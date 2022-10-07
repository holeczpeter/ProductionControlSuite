namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsByOperationHandler : IRequestHandler<GetDefectsByOperation, IEnumerable<DefectModel>>
    {
        private readonly FSKDbContext context;
        public GetDefectsByOperationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<DefectModel>> Handle(GetDefectsByOperation request, CancellationToken cancellationToken)
        {
            return await context.Defects.Where(x => x.OperationId == request.OperationId && x.EntityStatus == EntityStatuses.Active).Select(x => new DefectModel()
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = x.TranslatedName,
                DefectCategory = x.DefectCategory,
                OperationId = x.OperationId,
                OperationCode = x.Operation.Code,
                OperationName = x.Operation.Name,

            }).ToListAsync();
        }
    }
}
