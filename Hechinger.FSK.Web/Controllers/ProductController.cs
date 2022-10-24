using Hechinger.FSK.Application.Common;
using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Newtonsoft.Json;

namespace Hechinger.FSK.Web.Controllers
{
    public class ProductController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProductController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Add([FromBody] AddProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Update([FromBody] UpdateProduct request, CancellationToken cancellationToken)
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
        public async Task<IActionResult> GetAll([FromQuery]ProductRequestParameters request, CancellationToken cancellationToken)
        {
            var result = await this.mediator.Send(new GetAllProducts(request), cancellationToken);
            var count = await this.mediator.Send(new GetProductsCount(request), cancellationToken);
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
    }
}
