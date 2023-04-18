

namespace ProductionControlSuite.FSK.Web.Controllers
{
    [Authorize]
    public class DashboardController : ControllerBase
    {

        private readonly ILogger<DashboardController> logger;
        private readonly IMediator mediator;

        public DashboardController(IMediator mediator, ILogger<DashboardController> logger) 
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        [HttpGet]
        public async Task<IEnumerable<PpmWarning>> GetPpmWarnings(GetPpmWarnings request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkshopUserInfo>> GetWorkshopUserStats(GetWorkshopUserStats request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpGet]
        public async Task<IEnumerable<DashboardWorkshopPpm>> GetDashboardWorkshopPpm(GetDashboardWorkshopPpm request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<DashboardWorkshopCrapCost>> GetDashboardWorkshopCrapCost(GetDashboardWorkshopCrapCost request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkshopProduction>> GetWorkshopProduction(GetWorkshopProduction request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
