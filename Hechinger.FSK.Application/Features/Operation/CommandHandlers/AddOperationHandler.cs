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
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var currentProduct = await this.context.Products.Where(x => x.Id == request.ProductId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
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

            result.Message = "A művelet sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
