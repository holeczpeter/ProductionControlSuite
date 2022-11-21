namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopPPmData : IRequest<IEnumerable<WorkshopPpmData>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetWorkshopPPmData()
        {

        }
        public GetWorkshopPPmData(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
