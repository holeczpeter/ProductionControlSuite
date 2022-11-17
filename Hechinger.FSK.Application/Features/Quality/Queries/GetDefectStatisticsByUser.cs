namespace Hechinger.FSK.Application.Features
{
    public class GetDefectStatisticsByUser : IRequest<DefectStatisticModel>
    {

        public string WorkerCode { get; set; }

        public int OperationId { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public GetDefectStatisticsByUser(string workerCode,  int operationId, DateTime startDate, DateTime endDate)
        {

            WorkerCode = workerCode;
            OperationId = operationId;
            StartDate = startDate;
            EndDate = endDate;
        }
        public GetDefectStatisticsByUser()
        {

        }

    }
}
