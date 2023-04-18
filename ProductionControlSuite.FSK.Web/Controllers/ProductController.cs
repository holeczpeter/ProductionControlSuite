namespace ProductionControlSuite.FSK.Web.Controllers
{
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProductController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<int>> Add([FromBody] AddProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<int>> Update([FromBody] UpdateProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<int>> SaveProductContext([FromBody] SaveProductContext request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<ProductModel> Get(GetProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<ProductContext> GetProductContext(GetProductContext request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<SelectModel>> GetByFilter(GetProductByFilter request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
           
        }
        [HttpGet]
        public async Task<IEnumerable<ProductModel>> GetAll(GetAllProducts request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);

        }
        [HttpGet]
        public async Task<IActionResult> GetProductsByParameters([FromQuery]ProductRequestParameters request, CancellationToken cancellationToken)
        {
            var result = await this.mediator.Send(new GetProductsByParameters(request), cancellationToken);
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
    }
}
