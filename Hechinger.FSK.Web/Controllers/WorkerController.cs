using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class WorkerController : ControllerBase
    {
        private readonly IMediator mediator;

        public WorkerController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpGet]
        public async Task<IEnumerable<WorkerModel>> GetByFilter(GetWorkersByFilter request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkerModel>> GetAll(GetAllWorker request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }

}
