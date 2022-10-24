namespace Hechinger.FSK.Application.Features
{
    public class GetOperationsCount : IRequest<int>
    {
        public RequestParameters Parameters { get; set; }

        public GetOperationsCount(RequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetOperationsCount()
        {

        }
    }
}

