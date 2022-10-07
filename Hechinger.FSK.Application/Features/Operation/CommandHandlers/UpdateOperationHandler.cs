namespace Hechinger.FSK.Application.Features
{
    public class UpdateOperationHandler : IRequestHandler<UpdateOperation, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateOperationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateOperation request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Operations.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            var currentProduct = await this.context.Products.Where(x => x.Id == request.ProductId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentProduct == null)
            {
                result.Errors.Add("A termék nem található");
                return result;
            }
            if (current == null)
            {
                result.Errors.Add("A művelet nem található");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.Code = request.Code;
                current.TranslatedName = request.TranslatedName;
                current.Norma = request.Norma;
                current.OperationTime = request.OperationTime;
                current.Product = currentProduct;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A művelet sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
