using Hechinger.FSK.Application.Common;
using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Hechinger.FSK.Core.Enums;
using Hechinger.FSK.Core.Helpers;
using Hechinger.FSK.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class DefectController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly FSKDbContext context;
        private readonly IPermissionService permissionService;
        public DefectController(IMediator mediator, FSKDbContext context, IPermissionService permissionService)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.permissionService = permissionService ?? throw new ArgumentNullException(nameof(permissionService));
        }


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
        public async Task<IActionResult> GetAllDefectByParameters([FromQuery]DefectRequestParameters request, CancellationToken cancellationToken)
        {
            
            var result = await this.mediator.Send(new GetAllDefectByParameters(request), cancellationToken);
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
        public async Task<IEnumerable<DefectModel>> GetAll(GetAllDefects request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
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
