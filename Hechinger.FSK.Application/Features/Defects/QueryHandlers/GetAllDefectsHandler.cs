namespace Hechinger.FSK.Application.Features
{
    public class GetAllDefectsHandler : IRequestHandler<GetAllDefect, IEnumerable<DefectModel>>
    {
        private readonly FSKDbContext context;
        public GetAllDefectsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<DefectModel>> Handle(GetAllDefect request, CancellationToken cancellationToken)
        {
            return await context.Defects.Where(x => x.EntityStatus == EntityStatuses.Active).Select(x => new DefectModel()
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
