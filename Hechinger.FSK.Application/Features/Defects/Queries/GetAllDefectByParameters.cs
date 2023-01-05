namespace Hechinger.FSK.Application.Features
{
    public class GetAllDefectByParameters : IRequest<IEnumerable<DefectModel>>
    {
        public DefectRequestParameters Parameters { get; set; }

        public GetAllDefectByParameters(DefectRequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetAllDefectByParameters()
        {
            
        }
    }
}
