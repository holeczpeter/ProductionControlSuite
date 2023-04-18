namespace ProductionControlSuite.FSK.Application.Features
{
    public class UpdateShiftHandler : IRequestHandler<UpdateShift, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateShiftHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateShift request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Shifts.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("A műszak nem található");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.TranslatedName = request.TranslatedName;
                current.TranslatedName = request.TranslatedName;
                current.Start = request.Start;
                current.End = request.End;
                current.Code = request.ShortName;
                //current.TranslatedShortName = request.TranslatedShortName,
                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A műszak sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
