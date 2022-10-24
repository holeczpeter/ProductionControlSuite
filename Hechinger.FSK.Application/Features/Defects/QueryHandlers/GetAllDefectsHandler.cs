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

            return this.cache.GetCachedDefects();
        }
    }
}
