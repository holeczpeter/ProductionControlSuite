namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllDefectByParameters : IRequest<ParameterResult<DefectModel>>
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
