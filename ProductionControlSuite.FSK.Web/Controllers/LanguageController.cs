namespace ProductionControlSuite.FSK.Web.Controllers
{
    public class LanguageController : ControllerBase
    {
        private readonly IMediator mediator;

        public LanguageController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        
        [HttpGet]
        public async Task<IEnumerable<LanguageModel>> GetAll(GetAllLanguages request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
