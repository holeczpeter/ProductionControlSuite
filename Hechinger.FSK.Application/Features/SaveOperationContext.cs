namespace Hechinger.FSK.Application.Features
{
    public class SaveOperationContext : IRequest<Result<int>>
    {
        public IEnumerable<UpdateOperation> Operations { get; set; } = new List<UpdateOperation>();
    }
}

