using Hechinger.FSK.Application.Features.Workshop.DTO;
using Hechinger.FSK.Application.Features.Workshop.Queries;


namespace Hechinger.FSK.Web.Controllers
{
    public class WorkshopController : ControllerBase
    {
        private readonly IMediator mediator;

        public WorkshopController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        //[HttpPost]
        //public async Task<AddRateModelResult> AddRates([FromBody] AddRateModel request, CancellationToken cancellationToken)
        //{
        //    return await this.mediator.Send(request, cancellationToken);
        //}
        [HttpGet]
        public async Task<WorkshopModel> GetWorkshop(GetWorkshop request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<WorkshopModel>> GetAllWorkshop(GetAllWorkshops request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
