
namespace Hechinger.FSK.Application.Features
{
    public class GetAllDefectsHandler : IRequestHandler<GetAllDefect, IEnumerable<DefectModel>>
    {
        private readonly FSKDbContext context;
        private readonly IDefectCahche cache;
        public GetAllDefectsHandler(FSKDbContext context, IDefectCahche cache)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
        }
        public async Task<IEnumerable<DefectModel>> Handle(GetAllDefect request, CancellationToken cancellationToken)
        {

            return await context.Defects
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new DefectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = x.TranslatedName,
                    DefectCategory = x.DefectCategory,
                    DefectCategoryName = x.DefectCategory.GetDescription(),
                    OperationId = x.OperationId,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,

                })
                .FilterDefect(request.Parameters)
                .OrderBy(request.Parameters.OrderBy, request.Parameters.IsAsc)
                .Skip(request.Parameters.PageCount * (request.Parameters.Page - 1))
                .Take(request.Parameters.PageCount)
                .ToListAsync(cancellationToken);

        }
    }
}
