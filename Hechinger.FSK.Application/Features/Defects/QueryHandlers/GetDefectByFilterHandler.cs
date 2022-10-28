namespace Hechinger.FSK.Application.Features
{
    internal class GetDefectByFilterHandler : IRequestHandler<GetDefectByFilter, IEnumerable<SelectModel>>
    {
        private readonly FSKDbContext context;
        public GetDefectByFilterHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<IEnumerable<SelectModel>> Handle(GetDefectByFilter request, CancellationToken cancellationToken)
        {
            return await context.Defects
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


