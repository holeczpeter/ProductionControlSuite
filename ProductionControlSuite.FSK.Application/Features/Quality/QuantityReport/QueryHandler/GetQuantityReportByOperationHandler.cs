namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetQuantityReportByOperationHandler : IRequestHandler<GetQuantityReportByOperation, QuantityOperationReportModel>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        public GetQuantityReportByOperationHandler(FSKDbContext context, IQuantityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<QuantityOperationReportModel> Handle(GetQuantityReportByOperation request, CancellationToken cancellationToken)
        {

            return await this.quantityService.GetByOperation(request.OperationId, request.StartDate, request.EndDate, cancellationToken);
        }
    }
}
