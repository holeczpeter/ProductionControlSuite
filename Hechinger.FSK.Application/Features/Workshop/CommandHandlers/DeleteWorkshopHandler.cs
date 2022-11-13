namespace Hechinger.FSK.Application.Features
{
    public class DeleteWorkshopHandler : IRequestHandler<DeleteWorkshop, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteWorkshopHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteWorkshop request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Workshops.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("A műhely nem található");
                return result;
            }
            else
            {
                if(current.Products.Any()) 
                {
                    result.Errors.Add("A műhely nem törölhető, mert vannak termékei");
                    return result;
                }
                else
                {
                    current.EntityStatus = EntityStatuses.Deleted;
                    await context.SaveChangesAsync(cancellationToken);
                    result.Message = "A műhely sikeresen törölve";
                    result.IsSuccess = true;
                    return result;
                }
            }
        }
    }
}
