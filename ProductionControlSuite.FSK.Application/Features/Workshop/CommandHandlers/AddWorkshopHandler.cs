namespace ProductionControlSuite.FSK.Application.Features
{
    public class AddWorkshopHandler : IRequestHandler<AddWorkshop, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddWorkshopHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddWorkshop request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();

            var current = new Workshop()
            {
                Name = request.Name,
                TranslatedName = request.TranslatedName,
            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "workshop.addSuccesful";
            result.IsSuccess = true;    
            return result;

        }
    }
}
