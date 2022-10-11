using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<IEnumerable<TreeItem<MenuItemModel>>> GetAll(GetAccessMenu query, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(query, cancellationToken);
        }
    }
}
