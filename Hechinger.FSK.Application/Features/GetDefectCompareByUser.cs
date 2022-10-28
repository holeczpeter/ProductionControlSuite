namespace Hechinger.FSK.Application.Features
{
    public class GetDefectCompareByUser : IRequest<IEnumerable<DefectCompareByUser>>
    {

        public string WorkerCode { get; set; }

        public int OperationId { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public GetDefectCompareByUser(string workerCode,  int operationId, DateTime startDate, DateTime endDate)
        {

            WorkerCode = workerCode;
            OperationId = operationId;
            StartDate = startDate;
            EndDate = endDate;
        }
        public GetDefectCompareByUser()
        {

        }

    }
}
