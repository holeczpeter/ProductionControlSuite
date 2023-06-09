﻿namespace ProductionControlSuite.FSK.Web.Controllers
{
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IMediator mediator;

        public RoleController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> SetDefault([FromBody] SetDefaultRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<RoleDetailModel> Get(GetRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpGet]
        public async Task<IEnumerable<RoleModel>> GetAll(GetAllRoles request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<RoleUserItem>> GetUsersByRole(GetUsersByRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<RoleUserItem>> GetUsersExceptByRole(GetUsersExceptByRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<TreeItem<RoleMenuItem>>> GetMenuByRole(GetMenuByRole request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
