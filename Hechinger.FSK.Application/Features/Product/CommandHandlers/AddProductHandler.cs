﻿namespace Hechinger.FSK.Application.Features
{
    internal class AddProductHandler : IRequestHandler<AddProduct, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddProduct request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var currentWorkShop = await this.context.WorkShops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            var current = new Product()
            {
                Name = request.Name,
                Code = request.Code,    
                TranslatedName = request.TranslatedName,
                WorkShop = currentWorkShop
               
            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A termék sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
