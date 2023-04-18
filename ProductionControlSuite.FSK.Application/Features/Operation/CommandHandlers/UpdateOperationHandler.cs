namespace ProductionControlSuite.FSK.Application.Features
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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Operations.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var currentProduct = await this.context.Products.Where(x => x.Id == request.ProductId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentProduct == null)
            {
                result.Errors.Add("product.notFound");
                return result;
            }
            if (current == null)
            {
                result.Errors.Add("operation.notFound");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.Code = request.Code;
                current.TranslatedName = request.TranslatedName;
                current.Norma = request.Norma;
                current.Order = request.Order;  
                current.OperationTime = request.OperationTime;
                current.Product = currentProduct;
                current.PpmGoal = request.PpmGoal;  
                await context.SaveChangesAsync(cancellationToken);

                result.Message = "operation.updateSuccesful";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
