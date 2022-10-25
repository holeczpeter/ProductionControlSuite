using Hechinger.FSK.Application.Common;
using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Newtonsoft.Json;

namespace Hechinger.FSK.Web.Controllers
{
    public class OperationController : ControllerBase
    {
        private readonly IMediator mediator;

        public OperationController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<OperationModel> Get(GetOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<OperationModel>> GetByProduct(GetOperationsByProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] OperationRequestParameters request, CancellationToken cancellationToken)
        {
            var result = await this.mediator.Send(new GetAllOperation(request), cancellationToken);
            var count = await this.mediator.Send(new GetOperationsCount(request), cancellationToken);
            var paginationMetadata = new
            {
                totalCount = count,
                pageSize = request.PageCount,
                currentPage = request.Page,
                totalPages = request.GetTotalPages(count)
            };

            HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationMetadata));
            return Ok(result);
        }
        [HttpGet]
        public async Task<IEnumerable<SelectModel>> GetSelectModel(GetOperationSelectModel request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
