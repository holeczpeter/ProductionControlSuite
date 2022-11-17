using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class DashboardController : ControllerBase
    {


        private readonly IMediator mediator;

        public DashboardController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpGet]
        public async Task<IEnumerable<WorkshopPpmData>> GetWorkshopPpmData(GetWorkshopPPmData request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
       
    }
}
