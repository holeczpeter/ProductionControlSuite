namespace ProductionControlSuite.FSK.Application.Features
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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("product.notFound");
                return result;
            }
            else
            {
                if (current.Operations.Any())
                {
                    result.Errors.Add("product.existingRelation");
                    return result;
                }
                else
                {
                    current.EntityStatus = EntityStatuses.Deleted;
                    await context.SaveChangesAsync(cancellationToken);
                    result.Message = "product.deleteSuccesful";
                    result.IsSuccess = true;
                    return result;
                }
            }
        }
    }
}
