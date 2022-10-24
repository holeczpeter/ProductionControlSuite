namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsCount : IRequest<int>
    {
        public RequestParameters Parameters { get; set; }

        public GetDefectsCount(RequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetDefectsCount()
        {

        }
    }
}
