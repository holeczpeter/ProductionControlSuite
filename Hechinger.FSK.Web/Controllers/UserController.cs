using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Microsoft.AspNetCore.Authorization;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
       
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<UserModel> Get(GetUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<UserModel>> GetAll(GetAllUsers request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkshopUserItem>> GetWorkshopsByUser(GetWorkshopsByUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkshopUserItem>> GetWorkshopsExceptByUser(GetWorkshopsExceptByUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

    }
}
