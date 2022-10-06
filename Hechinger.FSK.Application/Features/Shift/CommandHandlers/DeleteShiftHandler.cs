namespace Hechinger.FSK.Application.Features
{
    public class DeleteShiftHandler : IRequestHandler<DeleteShift, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteShiftHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteShift request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Shifts.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A műszak nem található");
                return result;
            }
            else
            {
                current.EntityStatus = EntityStatuses.Deleted;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A műszak sikeresen törölve";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
