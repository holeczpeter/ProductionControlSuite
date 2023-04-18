namespace ProductionControlSuite.FSK.Web.Controllers
{
    [Authorize]
    public class SummaryCardController : ControllerBase
    {
        private readonly IMediator mediator;

        public SummaryCardController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        

        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<SummaryCardDetailModel> Get(GetSummaryCard request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllSummaryCardsByParameters([FromQuery]SummaryCardRequestParameters request, CancellationToken cancellationToken)
        {
            var result = await this.mediator.Send(new GetAllSummaryCardsByParameters(request), cancellationToken);
            var count = result.Count;
            var paginationMetadata = new
            {
                totalCount = count,
                pageSize = request.PageCount,
                currentPage = request.Page,
                totalPages = request.GetTotalPages(count)
            };

            HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationMetadata));
            return Ok(result.Result);
        }
        [HttpGet]
        public async Task<IEnumerable<SummaryCardModel>> GetAllSummaryCards(GetAllSummaryCards request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
