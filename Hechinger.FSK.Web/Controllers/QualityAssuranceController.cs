using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class QualityAssuranceController : ControllerBase
    {
        private readonly IMediator mediator;
        public QualityAssuranceController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

        [HttpGet]
        public async Task<QualityAssuranceProductModel> Get(GetQualityAssurance request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
