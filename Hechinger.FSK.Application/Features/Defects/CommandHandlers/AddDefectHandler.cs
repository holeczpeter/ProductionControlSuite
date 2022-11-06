namespace Hechinger.FSK.Application.Features
{
    public class AddDefectHandler : IRequestHandler<AddDefect, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddDefectHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddDefect request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var currentOperation = await this.context.Operations.Where(x => x.Id == request.OperationId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var current = new Defect()
            {
                Name = request.Name,
                Code = request.Code,
                TranslatedName = request.TranslatedName,
                DefectCategory = request.DefectCategory,
                Operation = currentOperation

            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A hiba sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
