namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllOperationByParameters : IRequest<ParameterResult<OperationModel>>
    {
        public OperationRequestParameters Parameters { get; set; }

        public GetAllOperationByParameters(OperationRequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetAllOperationByParameters()
        {

        }
    }
}
