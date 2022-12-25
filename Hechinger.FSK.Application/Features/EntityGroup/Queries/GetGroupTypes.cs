namespace Hechinger.FSK.Application.Features
{
    public class GetGroupTypes: IRequest<IEnumerable<EnumModel>>
    {
        public bool IsAll { get; set; }
    }
}
