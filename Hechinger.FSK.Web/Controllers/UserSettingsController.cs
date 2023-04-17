namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class UserSettingsController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserSettingsController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

        [HttpPost]
        public async Task<Result<bool>> UpdateUserSettings([FromBody] UpdateUserSettings request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<UserSettingsModel> GetUserSettings(GetUserSettings request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
