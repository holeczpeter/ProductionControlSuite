namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllSummaryCardsByParameters : IRequest<ParameterResult<SummaryCardModel>>
    {
        public SummaryCardRequestParameters Parameters { get; set; }

        public GetAllSummaryCardsByParameters(SummaryCardRequestParameters parameters)
        {
            Parameters = parameters;
        }

        public GetAllSummaryCardsByParameters()
        {

        }
    }
}
