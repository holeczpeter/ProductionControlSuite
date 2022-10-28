namespace Hechinger.FSK.Application.Features
{
    public class GetOperationByFilter : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
