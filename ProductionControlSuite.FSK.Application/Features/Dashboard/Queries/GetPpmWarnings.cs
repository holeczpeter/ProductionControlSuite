namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetPpmWarnings : IRequest<IEnumerable<PpmWarning>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetPpmWarnings()
        {

        }
        public GetPpmWarnings(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
