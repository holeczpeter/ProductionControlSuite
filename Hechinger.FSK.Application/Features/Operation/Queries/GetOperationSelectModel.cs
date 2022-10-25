namespace Hechinger.FSK.Application.Features
{
    public class GetOperationSelectModel : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
