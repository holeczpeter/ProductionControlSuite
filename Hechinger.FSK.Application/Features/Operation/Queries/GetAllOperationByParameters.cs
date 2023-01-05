namespace Hechinger.FSK.Application.Features
{
    public class GetAllOperationByParameters : IRequest<IEnumerable<OperationModel>>
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
