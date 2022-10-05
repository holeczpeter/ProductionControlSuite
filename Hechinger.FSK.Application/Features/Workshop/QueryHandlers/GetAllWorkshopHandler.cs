namespace Hechinger.FSK.Application.Features.Workshop.QueryHandlers
{
    public class GetAllWorkshopHandler : IRequestHandler<GetAllWorkshops, IEnumerable<WorkshopModel>>
    {
        private readonly FSKDbContext context;
        public GetAllWorkshopHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<WorkshopModel>> Handle(GetAllWorkshops request, CancellationToken cancellationToken)
        {
            return await this.context.WorkShops.Where(x => x.EntityStatus == EntityStatuses.Active).Select(x => new WorkshopModel()
                {
                    Id = x.Id,  
                    Name = x.Name
                }).ToListAsync();
        }
    }
}
