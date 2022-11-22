namespace Hechinger.FSK.Application.Features
{
    public class GetOperationPrintHandler : IRequestHandler<GetOperationPrint, OperationPrintModel>
    {
        private readonly FSKDbContext context;
        public GetOperationPrintHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<OperationPrintModel> Handle(GetOperationPrint request, CancellationToken cancellationToken)
        {
            return await context.Operations.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).Select(op => new OperationPrintModel()
            {
                Id = op.Id,
                Name = op.Name,
                Code = op.Code,
                TranslatedName = !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name,
                ProductId = op.ProductId,
                ProductName = op.Product.Name,
                ProductCode = op.Product.Code,
                Defects = op.Defects.Where(d=>d.EntityStatus == EntityStatuses.Active)
                                   .Select(d=> new DefectPrintModel() 
                                   { 
                                       Id = d.Id,
                                       Order = d.Order,
                                       Name = d.Name,   
                                       Code= d.Code, 
                                       DefectCategory = d.DefectCategory,
                                       TranslatedName = !String.IsNullOrEmpty(d.TranslatedName) ? d.TranslatedName : d.Name,
                                   })
            }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
