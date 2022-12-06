using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class EntityGroupController : ControllerBase
    {
        private readonly IMediator mediator;

        public EntityGroupController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Save([FromBody] SaveEntityGroup request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpGet]
        public async Task<IEnumerable<TreeItem<EntityGroupModel>>> GetAll(GetAllEntityGroups request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
       
    }

}
