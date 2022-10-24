namespace Hechinger.FSK.Application.Features
{
    public class GetAllOperation : IRequest<IEnumerable<OperationModel>>
    {
        public OperationRequestParameters Parameters { get; set; }

        public GetAllOperation(OperationRequestParameters parameters)
        {
            this.Parameters = parameters;
        }
        public GetAllOperation()
        {

        }
    }
}
