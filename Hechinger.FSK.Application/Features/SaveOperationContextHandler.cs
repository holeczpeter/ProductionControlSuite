namespace Hechinger.FSK.Application.Features
{
    public class SaveOperationContextHandler : IRequestHandler<SaveOperationContext, Result<int>>
    {
        private readonly FSKDbContext context;
        public SaveOperationContextHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<int>> Handle(SaveOperationContext request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<int>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            foreach (var item in request.Operations)
            {
                var current = await context.Operations.Where(x => x.Id == item.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
                var currentProduct = await this.context.Products.Where(x => x.Id == item.ProductId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
                if (currentProduct == null)
                {
                    result.Errors.Add("A termék nem található");
                    return result;
                }
                if (current == null) current = new Operation();
                current.Name = item.Name;
                current.Code = item.Code;
                current.TranslatedName = item.TranslatedName;
                current.Norma = item.Norma;
                current.OperationTime = item.OperationTime;
                current.Product = currentProduct;
                var state = this.context.Entry(current).State;
                if (state != EntityState.Modified && state != EntityState.Unchanged) await this.context.Operations.AddAsync(current, cancellationToken);

            }
            await context.SaveChangesAsync(cancellationToken);
            result.Message = "A műveletlista sikeresen mentve";
            result.IsSuccess = true;
            
            return result;
        }
    }
}
