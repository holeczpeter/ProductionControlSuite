namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopsExceptByUserHandler : IRequestHandler<GetWorkshopsExceptByUser, IEnumerable<WorkshopUserItem>>
    {
        private readonly FSKDbContext context;
        public GetWorkshopsExceptByUserHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<WorkshopUserItem>> Handle(GetWorkshopsExceptByUser request, CancellationToken cancellationToken)
        {
            var userworkshopIds = await this.context.WorkshopUsers.Where(x => x.UserId == request.UserId && x.EntityStatus == EntityStatuses.Active).Select(x=>x.WorkshopId).ToListAsync(cancellationToken);
            return await this.context.Workshops
                .Where(x => !userworkshopIds.Contains(x.Id))
                .Select(x => new WorkshopUserItem()
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync(cancellationToken);
        }
    }
}

