namespace Hechinger.FSK.Application.Features
{
    public class GetProductionInformation : IRequest<IEnumerable<ProductionInfo>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetProductionInformation()
        {

        }
        public GetProductionInformation(DateTime startDate, DateTime endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
