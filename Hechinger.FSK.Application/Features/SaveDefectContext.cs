namespace Hechinger.FSK.Application.Features
{
    public class SaveDefectContext : IRequest<Result<int>>
    {
        public IEnumerable<UpdateDefect> Defects { get; set; } = new List<UpdateDefect>();
    }
}
