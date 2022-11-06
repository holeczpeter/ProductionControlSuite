using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Common.Security;
using Hechinger.FSK.Application.Features;
using Hechinger.FSK.Core.Enums;
using System.Security.Claims;

namespace Hechinger.FSK.Web.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly IAuthenticationManager authenticationManager;
        public AccountController(IMediator mediator, IAuthenticationManager authenticationManager)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.authenticationManager = authenticationManager ?? throw new ArgumentNullException(nameof(authenticationManager));
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel request, CancellationToken cancellationToken) 
        {
            var item = await this.mediator.Send(request, cancellationToken);
            if (item.LoginStatus is not (LoginResults.Success or LoginResults.IsTemporaryPassword)) return Ok(item);
            Claim[] claims = { new("user", item.UserInfo.Id.ToString()) };
            item.Token = authenticationManager.GenerateSecurityToken(claims);
            item.RefreshToken = authenticationManager.GenerateRefreshToken();
            item.AccessMenu = await mediator.Send(new GetAccessMenu(item.UserInfo.Id), cancellationToken);
            var userRefreshToken = new UserRefreshToken
            {
                UserId = item.UserInfo.Id,
                Expiration = DateTime.Now.AddHours(3),
                RefreshToken = item.RefreshToken
            };
            await this.mediator.Send(userRefreshToken, cancellationToken);
            return Ok(item);
        }

        [HttpPost]
        public async Task<Result<bool>> ChangeTemporaryPassword([FromBody] ChangePassword request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> ChangePassword([FromBody] ChangePassword request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> ChangePasswordByAdmin([FromBody] ChangePasswordByAdmin request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> ForgotPassword([FromBody] ForgotPassword request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpGet]
        public async Task<IEnumerable<TreeItem<MenuItemModel>>> GetAll(GetAccessMenu request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
