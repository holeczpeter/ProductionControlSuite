namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopHandler : IRequestHandler<GetWorkshop, WorkshopModel>
    {
        private readonly FSKDbContext context;
        public GetWorkshopHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<WorkshopModel> Handle(GetWorkshop request, CancellationToken cancellationToken)
        {
            return await context.WorkShops.Where(x => x.EntityStatus == EntityStatuses.Active && x.Id == request.Id).Select(x => new WorkshopModel()
            {
                Id = x.Id,
                Name = x.Name,
                TranslatedName = x.TranslatedName,
            }).FirstOrDefaultAsync();
        }
    }
}
