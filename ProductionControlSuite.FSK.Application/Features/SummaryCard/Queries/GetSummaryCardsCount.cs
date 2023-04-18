namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetSummaryCardsCount : IRequest<int>
    {
        public SummaryCardRequestParameters Parameters { get; set; }

        public GetSummaryCardsCount(SummaryCardRequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetSummaryCardsCount()
        {

        }
    }
}
