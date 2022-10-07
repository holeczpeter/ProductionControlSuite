using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class OperationController : ControllerBase
    {
        private readonly IMediator mediator;

        public OperationController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<OperationModel> Get(GetOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<OperationModel>> Get(GetOperationsByProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<OperationModel>> GetAll(GetAllOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
