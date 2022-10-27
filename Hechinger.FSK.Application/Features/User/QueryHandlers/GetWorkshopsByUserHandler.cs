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
            return await this.context.WorkShopUsers.Where(x => x.UserId == request.UserId)
                .Select(x => new WorkshopUserItem()
                {
                    Id = x.WorkShop.Id,
                    Name = x.WorkShop.Name,
                }).ToListAsync();
        }
    }
}
