using Hechinger.FSK.Application.Common;
using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Newtonsoft.Json;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> GetAll([FromQuery]DefectRequestParameters request, CancellationToken cancellationToken)
        {
            var result = await this.mediator.Send(new GetAllDefect(request), cancellationToken);
            var count = await this.mediator.Send(new GetDefectsCount(request), cancellationToken);
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
        public async Task<IEnumerable<DefectModel>> GetByOperation(GetDefectsByOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<SelectModel>> GetByFilter(GetDefectByFilter request, CancellationToken cancellationToken)
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
