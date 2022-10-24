namespace Hechinger.FSK.Application.Features
{
    public class GetAllSummaryCards : IRequest<IEnumerable<SummaryCardModel>>
    {
        public SummaryCardRequestParameters Parameters { get; set; }

        public GetAllSummaryCards(SummaryCardRequestParameters parameters)
        {
            Parameters = parameters;
        }

        public GetAllSummaryCards()
        {

        }
    }
}
