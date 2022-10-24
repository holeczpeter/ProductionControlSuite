namespace Hechinger.FSK.Application.Features
{
    public class GetAllDefect : IRequest<IEnumerable<DefectModel>>
    {
        public DefectRequestParameters Parameters { get; set; }

        public GetAllDefect(DefectRequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetAllDefect()
        {
            
        }
    }
}
