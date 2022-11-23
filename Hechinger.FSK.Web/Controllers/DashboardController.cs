using Hechinger.FSK.Application.Features;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace Hechinger.FSK.Web.Controllers
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
        public async Task<IEnumerable<WorkshopPpmData>> GetWorkshopPpmData(GetWorkshopPPmData request, CancellationToken cancellationToken)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            var results = await this.mediator.Send(request, cancellationToken);
            sw.Stop();
            this.logger.LogInformation($"GetWorkshopPpmData: {sw.Elapsed.TotalMilliseconds.ToString()}");
            return results;
        }
        [HttpGet]
        public async Task<IEnumerable<DashboardCrapCost>> GetDashboardCrapCost(GetDashboardCrapCost request, CancellationToken cancellationToken)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            var results = await this.mediator.Send(request, cancellationToken);
            sw.Stop();
            this.logger.LogInformation($"GetDashboardCrapCost: {sw.Elapsed.TotalMilliseconds.ToString()}");
            return results;
        }
        [HttpGet]
        public async Task<IEnumerable<ProductionInfo>> GetProductionInformation(GetProductionInformation request, CancellationToken cancellationToken)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            var results = await this.mediator.Send(request, cancellationToken);
            sw.Stop();
            this.logger.LogInformation($"GetProductionInformation: {sw.Elapsed.TotalMilliseconds.ToString()}");
            return results;
        }
    }
}
