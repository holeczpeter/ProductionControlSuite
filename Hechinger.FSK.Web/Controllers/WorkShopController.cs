namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class WorkshopController : ControllerBase
    {
        private readonly IMediator mediator;

        public WorkshopController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        

        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddWorkshop request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateWorkshop request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteWorkshop request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<SelectModel>> GetByFilter(GetWorkshopByFilter request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);

        }
        [HttpGet]
        public async Task<WorkshopModel> Get(GetWorkshop request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkshopModel>> GetAll(GetAllWorkshops request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
