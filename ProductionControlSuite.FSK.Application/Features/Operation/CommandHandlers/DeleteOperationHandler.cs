namespace ProductionControlSuite.FSK.Application.Features
{
    public class DeleteOperationHandler : IRequestHandler<DeleteOperation, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteOperationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteOperation request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Operations.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("operation.notFound");
                return result;
            }
            else
            {
                if (current.Defects.Any() || current.SummaryCards.Any())
                {
                    result.Errors.Add("operation.existingRelation");
                    return result;
                }
               
                current.EntityStatus = EntityStatuses.Deleted;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "operation.deleteSuccesful";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
