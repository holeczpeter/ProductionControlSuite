namespace Hechinger.FSK.Application.Features
{
    public class DeleteProductHandler : IRequestHandler<DeleteProduct, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteProduct request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A termék nem található");
                return result;
            }
            else
            {
                if (current.Operations.Any())
                {
                    result.Errors.Add("A termék nem törölhető, mert vannak műveletei");
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
