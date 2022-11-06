namespace Hechinger.FSK.Application.Features
{
    public class UpdateProductHandler : IRequestHandler<UpdateProduct, Result<int>>
    {
        private readonly FSKDbContext context;
        public UpdateProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<int>> Handle(UpdateProduct request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<int>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var currentWorkShop = await this.context.WorkShops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentWorkShop == null)
            {
                result.Errors.Add("A műhely nem található");
                return result;
            }
            if (current == null)
            {
                result.Errors.Add("A termék nem található");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.Code = request.Code;
                current.TranslatedName = request.TranslatedName;
                current.WorkShop = currentWorkShop;
                await context.SaveChangesAsync(cancellationToken);
                result.Message = "A termék sikeresen módosítva";
                result.IsSuccess = true;
                result.Entities = current.Id;
                return result;
            }
        }
    }
}
