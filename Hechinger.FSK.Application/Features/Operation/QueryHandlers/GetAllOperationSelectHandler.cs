namespace Hechinger.FSK.Application.Features
{
    public class GetAllOperationSelectHandler : IRequestHandler<GetOperationSelectModel, IEnumerable<SelectModel>>
    {
        private readonly FSKDbContext context;
        public GetAllOperationSelectHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<IEnumerable<SelectModel>> Handle(GetOperationSelectModel request, CancellationToken cancellationToken)
        {
            return await context.Operations
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new SelectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = x.TranslatedName
                })
                .Where(x => x.Name.StartsWith(request.Filter) || x.Code.StartsWith(request.Filter) || string.IsNullOrEmpty(request.Filter))
                .Take(25)
                .ToListAsync(cancellationToken);
        }
    }
}
