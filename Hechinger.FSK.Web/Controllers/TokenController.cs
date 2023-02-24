using Hechinger.FSK.Application.Common.Security;
using Hechinger.FSK.Application.Features;
using System.Linq;

namespace Hechinger.FSK.Web.Controllers
{

    public class TokenController
    {
        private readonly IMediator mediator;
        private readonly IAuthenticationManager authenticationManager;
        public TokenController(IMediator mediator, IAuthenticationManager authenticationManager)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.authenticationManager = authenticationManager ?? throw new ArgumentNullException(nameof(authenticationManager));
        }


        [HttpPost]
        public async Task<ActionResult> Refresh([FromBody] TokenRequestModel item, CancellationToken cancellationToken)
        {

            try
            {
                var user = await this.mediator.Send(new GetUserTokenInfo(item.UserId), cancellationToken);
                var principal = authenticationManager.GetPrincipalFromExpiredToken(item.Token);
                if (principal == null) return new UnauthorizedResult();
                if (user == null || user.RefreshToken != item.RefreshToken || DateTime.Now > user.Expiration) return new UnauthorizedResult();

                var newJwtToken = authenticationManager.GenerateSecurityToken(principal.Claims.ToArray());
                var newRefreshToken = authenticationManager.GenerateRefreshToken();

                var userRefreshToken = new UserRefreshToken()
                {
                    UserId = user.UserId,
                    Expiration = DateTime.Now.AddMinutes(30),
                    Token = newJwtToken,
                    RefreshToken = newRefreshToken,
                };

                await this.mediator.Send(userRefreshToken, cancellationToken);

                return new ObjectResult(new { token = newJwtToken, refreshToken = newRefreshToken });
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }


        }
    }
}
