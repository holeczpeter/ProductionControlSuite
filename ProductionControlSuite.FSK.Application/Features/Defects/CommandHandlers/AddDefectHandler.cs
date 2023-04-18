namespace ProductionControlSuite.FSK.Application.Features
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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var existingCode = await this.context.Defects.Where(x => x.EntityStatus == EntityStatuses.Active && x.Code == request.Code).AnyAsync(cancellationToken);
            if (existingCode)
            {
                result.Errors.Add("fehler.existingCode");
                result.Errors.Add(request.Code);
                return result;
            }
            var currentOperation = await this.context.Operations.Where(x => x.Id == request.OperationId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var current = new Defect()
            {
                Name = request.Name,
                Code = request.Code,
                Order = request.Order,
                TranslatedName = request.TranslatedName,
                DefectCategory = request.DefectCategory,
                Operation = currentOperation

            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "fehler.addSuccesful";
            result.IsSuccess = true;
            return result;
        }
    }
}
