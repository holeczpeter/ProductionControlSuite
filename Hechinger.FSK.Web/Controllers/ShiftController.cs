using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class ShiftController : ControllerBase
    {
        private readonly IMediator mediator;

        public ShiftController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddShift request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateShift request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteShift request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<ShiftModel> Get(GetShift request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<ShiftModel>> GetAll(GetAllShifts request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
