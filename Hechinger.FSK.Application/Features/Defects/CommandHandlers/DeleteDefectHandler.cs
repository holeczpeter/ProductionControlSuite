namespace Hechinger.FSK.Application.Features
{
    public class DeleteDefectHandler : IRequestHandler<DeleteDefect, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteDefectHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteDefect request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Defects.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A hiba nem található");
                return result;
            }
            else
            {
                if (current.SummaryCardItems.Any())
                {
                    result.Errors.Add("A hiba nem törölhető, mert vannak hibagyüjtői");
                    return result;
                }
                current.EntityStatus = EntityStatuses.Deleted;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A hiba sikeresen törölve";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
