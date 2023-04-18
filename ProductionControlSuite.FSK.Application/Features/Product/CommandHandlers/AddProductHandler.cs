namespace ProductionControlSuite.FSK.Application.Features
{
    public class AddProductHandler : IRequestHandler<AddProduct, Result<int>>
    {
        private readonly FSKDbContext context;
        public AddProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<int>> Handle(AddProduct request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<int>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var existingCode = await this.context.Products.Where(x => x.EntityStatus == EntityStatuses.Active && x.Code == request.Code).AnyAsync(cancellationToken);
            if (existingCode)
            {
                result.Errors.Add("product.existingCode");
                result.Errors.Add(request.Code);
                return result;
            }
            var currentWorkShop = await this.context.Workshops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentWorkShop == null)
            {
                result.Errors.Add("workshop.notFound");
                return result;
            }

            var current = new Product()
            {
                Name = request.Name,
                Code = request.Code,    
                TranslatedName = request.TranslatedName,
                Workshop = currentWorkShop
               
            };
            await this.context.AddAsync(current, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "product.addSuccesful";
            result.IsSuccess = true;
            result.Entities = result.Entities = current.Id;
            return result;
        }
    }
}
