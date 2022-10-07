using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class SummaryCardController : ControllerBase
    {
        private readonly IMediator mediator;

        public SummaryCardController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        

        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<SummaryCardDetailModel> Get(GetSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<SummaryCardModel>> GetAll(GetAllSummaryCards request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
