namespace Hechinger.FSK.Application.Features
{
    public class GetQuantityReportByProductHandler : IRequestHandler<GetQuantityReportByProduct, IEnumerable<QuantityOperationReportModel>>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        public GetQuantityReportByProductHandler(FSKDbContext context, IQuantityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<QuantityOperationReportModel>> Handle(GetQuantityReportByProduct request, CancellationToken cancellationToken)
        {

            return await this.quantityService.GetByProduct(request.ProductId, request.StartDate, request.EndDate, cancellationToken);
        }
    }
}
