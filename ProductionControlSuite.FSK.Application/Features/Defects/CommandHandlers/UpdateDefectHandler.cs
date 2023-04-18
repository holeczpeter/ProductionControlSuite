namespace ProductionControlSuite.FSK.Application.Features
{
    public class UpdateDefectHandler : IRequestHandler<UpdateDefect, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateDefectHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateDefect request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Defects.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var currentOperation = await this.context.Operations.Where(x => x.Id == request.OperationId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentOperation == null)
            {
                result.Errors.Add("operation.notFound");
                return result;
            }
            if (current == null)
            {
                result.Errors.Add("fehler.notFound");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.Code = request.Code;
                current.Order = request.Order;
                current.TranslatedName = request.TranslatedName;
                current.DefectCategory = request.DefectCategory;
                current.Operation = currentOperation;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "fehler.updateSuccesful";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
