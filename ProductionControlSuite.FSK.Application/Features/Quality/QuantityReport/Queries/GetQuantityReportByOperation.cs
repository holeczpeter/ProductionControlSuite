namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetQuantityReportByOperation : IRequest<QuantityOperationReportModel>
    {
        public int OperationId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetQuantityReportByOperation()
        {

        }
        public GetQuantityReportByOperation(int operationId, DateTime startDate, DateTime endDate)
        {
            OperationId = operationId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
