namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsCount : IRequest<int>
    {
        public DefectRequestParameters Parameters { get; set; }

        public GetDefectsCount(DefectRequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetDefectsCount()
        {

        }
    }
}
