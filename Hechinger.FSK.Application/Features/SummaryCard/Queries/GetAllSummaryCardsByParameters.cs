﻿namespace Hechinger.FSK.Application.Features
{
    public class GetAllSummaryCardsByParameters : IRequest<IEnumerable<SummaryCardModel>>
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
