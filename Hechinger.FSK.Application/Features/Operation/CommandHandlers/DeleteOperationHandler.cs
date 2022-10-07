namespace Hechinger.FSK.Application.Features
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
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Operations.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A művelet nem található");
                return result;
            }
            else
            {
                if (current.Defects.Any())
                {
                    result.Errors.Add("A művelet nem törölhető, mert vannak hibái");
                    return result;
                }
                if (current.SummaryCards.Any())
                {
                    result.Errors.Add("A művelet nem törölhető, mert vannak hibagyüjtői");
                    return result;
                }
                current.EntityStatus = EntityStatuses.Deleted;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A művelet sikeresen törölve";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
