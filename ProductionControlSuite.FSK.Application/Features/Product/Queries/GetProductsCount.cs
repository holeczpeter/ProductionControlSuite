namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetProductsCount : IRequest<int>
    {
        public RequestParameters Parameters { get; set; }

        public GetProductsCount(RequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetProductsCount()
        {

        }
    }
}
