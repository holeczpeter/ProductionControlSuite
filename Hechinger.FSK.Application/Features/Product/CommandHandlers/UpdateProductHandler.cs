namespace Hechinger.FSK.Application.Features
{
    public class UpdateProductHandler : IRequestHandler<UpdateProduct, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateProduct request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            var currentWorkShop = await this.context.WorkShops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
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
                return result;
            }
        }
    }
}
