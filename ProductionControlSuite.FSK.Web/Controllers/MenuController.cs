namespace ProductionControlSuite.FSK.Web.Controllers
{
    [Authorize]
    public class MenuController : ControllerBase
    {
        private readonly IMediator mediator;

        public MenuController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet]
        public async Task<IEnumerable<TreeItem<MenuItemModel>>> GetAll(GetAllMenuItem query, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(query, cancellationToken);
        }
       
    }
}
