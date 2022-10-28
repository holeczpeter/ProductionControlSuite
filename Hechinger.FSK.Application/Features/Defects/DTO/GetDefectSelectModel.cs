namespace Hechinger.FSK.Application.Features
{
    public class GetDefectSelectModel : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
