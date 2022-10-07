using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    
    public class DefectController : ControllerBase
    {
        private readonly IMediator mediator;

        public DefectController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddDefect request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateDefect request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteDefect request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<DefectModel> Get(GetDefect request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<DefectModel>> GetAll(GetAllDefect request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpGet]
        public async Task<IEnumerable<DefectModel>> GetByOperation(GetDefectsByOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<EnumModel>> GetAllDefectCategories(GetAllDefectCategories request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
