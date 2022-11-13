namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopsByUserHandler : IRequestHandler<GetWorkshopsByUser, IEnumerable<WorkshopUserItem>>
    {
        private readonly FSKDbContext context;
        public GetWorkshopsByUserHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<WorkshopUserItem>> Handle(GetWorkshopsByUser request, CancellationToken cancellationToken)
        {
            return await this.context.WorkshopUsers.Where(x => x.UserId == request.UserId && x.EntityStatus == EntityStatuses.Active)
                .Select(x => new WorkshopUserItem()
                {
                    Id = x.Workshop.Id,
                    Name = x.Workshop.Name,
                }).ToListAsync(cancellationToken);
        }
    }
}
