namespace Hechinger.FSK.Application.Features
{
    public class GetDefectHandler : IRequestHandler<GetDefect, DefectModel>
    {
        private readonly FSKDbContext context;
        public GetDefectHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<DefectModel> Handle(GetDefect request, CancellationToken cancellationToken)
        {
            return await context.Defects.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).Select(x => new DefectModel()
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = x.TranslatedName,
                DefectCategory = x.DefectCategory,
                OperationId = x.OperationId,
                OperationCode = x.Operation.Code,
                OperationName = x.Operation.Name,

            }).FirstOrDefaultAsync();
        }
    }
}
