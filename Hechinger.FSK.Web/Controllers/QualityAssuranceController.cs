using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    public class QualityAssuranceController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly IImportService importService;
        public QualityAssuranceController(IMediator mediator, IImportService importService) 
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.importService = importService ?? throw new ArgumentNullException(nameof(importService));
        }

        [HttpGet]
        public async Task<QualityAssuranceProductModel> Get(GetQualityAssurance request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpPost]
        public async Task<bool> Import(CancellationToken cancellationToken)
        {
           // await this.importService.ImportOperations(cancellationToken);
            //await this.importService.ImportFehlers(cancellationToken);
            await this.importService.ImportCards(cancellationToken);
            return true;

        }
    }
}
