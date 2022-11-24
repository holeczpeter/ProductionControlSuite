namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopUserStatsHandler : IRequestHandler<GetWorkshopUserStats, IEnumerable<WorkshopUserInfo>>
    {
        private readonly FSKDbContext context;
        public GetWorkshopUserStatsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<WorkshopUserInfo>> Handle(GetWorkshopUserStats request, CancellationToken cancellationToken)
        {
           return await this.context.Workshops
                .AsNoTracking()
                .Select(w => new WorkshopUserInfo { 
                    WorkshopName = w.Name,
                    Count = w.Users.Count,
                }).ToListAsync(cancellationToken);

        }
    }
}
