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
            
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Defects.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("fehler.notFound");
                return result;
            }
            else
            {
                if (current.SummaryCardItems.Any())
                {
                    result.Errors.Add("fehler.existingRelation");
                    return result;
                }
                current.EntityStatus = EntityStatuses.Deleted;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "fehler.deleteSuccesful";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
