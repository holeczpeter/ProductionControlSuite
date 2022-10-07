namespace Hechinger.FSK.Application.Features
{
    public class GetOperation : IRequest<OperationModel>
    {
        public int Id { get; set; }
        public GetOperation(int id) => Id = id;
    }
}
