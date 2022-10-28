namespace Hechinger.FSK.Application.Features
{
    public class GetWorkersByFilter : IRequest<IEnumerable<WorkerModel>>
    {
        public string Filter { get; set; }
    }
}
