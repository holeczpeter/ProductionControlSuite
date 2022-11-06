using Microsoft.AspNetCore.Authorization;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class FileController : ControllerBase
    {
        private readonly IMediator mediator;

        public FileController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
       
    }
}
