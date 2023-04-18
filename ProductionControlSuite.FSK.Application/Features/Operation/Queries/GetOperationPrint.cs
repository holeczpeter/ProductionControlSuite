namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetOperationPrint : IRequest<OperationPrintModel>
    {
        public int Id { get; set; }
        public GetOperationPrint() { }
        public GetOperationPrint(int id) => Id = id;
    }
}
