namespace Hechinger.FSK.Application.Features
{
    public class AddOperationHandler : IRequestHandler<AddOperation, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddOperationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddOperation request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var existingCode = await this.context.Operations.Where(x=> x.EntityStatus == EntityStatuses.Active && x.Code == request.Code).AnyAsync(cancellationToken);
            if (existingCode) 
            {
                result.Errors.Add("operation.existingCode");
                result.Errors.Add(request.Code);
                return result;
            }
            var currentProduct = await this.context.Products.Where(x => x.Id == request.ProductId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);

            if (currentProduct == null)
            {
                result.Errors.Add("product.notFound");
                return result;
            }
            var current = new Operation()
            {
                Name = request.Name,
                Code = request.Code,
                TranslatedName = request.TranslatedName,
                Norma = request.Norma,
                PpmGoal = request.PpmGoal,
                OperationTime = request.OperationTime,  
                Product = currentProduct

            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "operation.addSuccesful";
            result.IsSuccess = true;
            return result;
        }
    }
}
