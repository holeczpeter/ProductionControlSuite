namespace Hechinger.FSK.Web.Controllers
{
    public class FileController : ControllerBase
    {
        private readonly IMediator mediator;

        public FileController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        //[HttpGet]
        //public async Task<IEnumerable<TreeItem<MenuItemModel>>> GetAll(GetAllMenuItem query, CancellationToken cancellationToken)
        //{
        //    return await this.mediator.Send(query, cancellationToken);
        //}

    }
}
