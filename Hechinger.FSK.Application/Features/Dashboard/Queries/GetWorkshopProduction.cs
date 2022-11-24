namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopProduction : IRequest<IEnumerable<WorkshopProduction>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetWorkshopProduction()
        {

        }
        public GetWorkshopProduction(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
