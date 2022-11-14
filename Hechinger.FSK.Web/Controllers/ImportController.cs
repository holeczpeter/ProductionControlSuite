using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Hechinger.FSK.Application.Features.Import.CommandHandler;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class ImportController : ControllerBase
    {
        private readonly IMediator mediator;
     
        public ImportController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        
        }
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<Result<IEnumerable<ImportError>>> ImportOperation([FromForm] OperationImport request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<Result<IEnumerable<ImportError>>> ImportDefect([FromForm] DefectImport request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<Result<IEnumerable<ImportError>>> ImportSummaryCard([FromForm] SummaryCardImport request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
