namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsByOperation : IRequest<IEnumerable<DefectModel>>
    {
        public int OperationId { get; set; }
        public GetDefectsByOperation(int operationId) => OperationId = operationId;
        public GetDefectsByOperation()
        {
        }
    }
}
