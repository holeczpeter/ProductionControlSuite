namespace Hechinger.FSK.Application.Features
{
    internal class AddProductContextHandler : IRequestHandler<AddProductContext, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddProductContextHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddProductContext request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var currentWorkShop = await this.context.WorkShops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var current = new Product()
            {
                Name = request.Name,
                Code = request.Code,
                TranslatedName = request.TranslatedName,
                WorkShop = currentWorkShop

            };
            await this.context.AddAsync(current, cancellationToken);

            foreach (var item in request.Operations)
            {
                var newRelation = new Operation()
                {
                    Name = item.Name,
                    Code = item.Code,
                    TranslatedName = item.TranslatedName,
                    Norma = item.Norma,
                    OperationTime = item.OperationTime,
                    Product = current
                };
                await this.context.AddAsync(newRelation);
            }


            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A termék sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
