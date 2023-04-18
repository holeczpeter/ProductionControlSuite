namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetWorkerStatisticsByDefect : IRequest<WorkerStatisticsModel>
    {
       
        public int DefectId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public GetWorkerStatisticsByDefect( int defectId, DateTime startDate, DateTime endDate)
        {
           
            DefectId = defectId;
            StartDate = startDate;
            EndDate = endDate;
        }
        public GetWorkerStatisticsByDefect()
        {

        }

    }
}
