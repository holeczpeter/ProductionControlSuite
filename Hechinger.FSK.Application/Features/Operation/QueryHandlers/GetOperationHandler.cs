namespace Hechinger.FSK.Application.Features
{
    public class GetOperationHandler : IRequestHandler<GetOperation, OperationModel>
    {
        private readonly FSKDbContext context;
        public GetOperationHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<OperationModel> Handle(GetOperation request, CancellationToken cancellationToken)
        {
            return await context.Operations.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).Select(x => new OperationModel()
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                OperationTime = x.OperationTime,
                Norma = x.Norma,
                ProductId = x.ProductId,
                ProductName = x.Product.Name,
                ProductCode = x.Product.Code,
                HasDefect = x.Defects.Any(),
            }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
