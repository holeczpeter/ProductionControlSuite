namespace Hechinger.FSK.Application.Features
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
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            var current = new WorkShop()
            {
                Name = request.Name,
            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A műhely sikeresen létrehozva";
            result.IsSuccess = true;    
            return result;

        }
    }
}
