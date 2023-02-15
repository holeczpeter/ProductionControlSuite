namespace Hechinger.FSK.Application.Features
{
    public class UpdateProductHandler : IRequestHandler<UpdateProduct, Result<int>>
    {
        private readonly FSKDbContext context;
        public UpdateProductHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<int>> Handle(UpdateProduct request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<int>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var currentWorkShop = await this.context.Workshops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentWorkShop == null)
            {
                result.Errors.Add("workshop.notFound");
                return result;
            }
            if (current == null)
            {
                result.Errors.Add("product.notFound");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.Code = request.Code;
                current.TranslatedName = request.TranslatedName;
                current.Workshop = currentWorkShop;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "product.updateSuccesful";
                result.IsSuccess = true;
                result.Entities = current.Id;
                return result;
            }
        }
    }
}
