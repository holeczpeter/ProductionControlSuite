namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetCrapCostByOperation : IRequest<CrapCostProductModel>
    {
        public int OperationId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetCrapCostByOperation()
        {

        }
        public GetCrapCostByOperation(int operationId, DateTime startDate, DateTime endDate)
        {
            OperationId = operationId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
