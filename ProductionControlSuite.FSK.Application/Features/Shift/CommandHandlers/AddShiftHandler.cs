namespace ProductionControlSuite.FSK.Application.Features
{
    public class AddShiftHandler : IRequestHandler<AddShift, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddShiftHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddShift request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var current = new Shift()
            {
                Name = request.Name,
                TranslatedName = request.TranslatedName,
                Start = request.Start,  
                End = request.End,
                Code = request.ShortName,  
                //TranslatedShortName = request.TranslatedShortName,
            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A műszak sikeresen létrehozva";
            result.IsSuccess = true;
            return result;

        }
    }
}
