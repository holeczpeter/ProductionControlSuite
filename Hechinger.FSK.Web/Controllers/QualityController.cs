using Hechinger.FSK.Application;
using Hechinger.FSK.Application.Features;
using Microsoft.AspNetCore.Authorization;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class QualityController : ControllerBase
    {
        private readonly IMediator mediator;
        
        public QualityController(IMediator mediator) 
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpGet]
        public async Task<QualityAssuranceProductModel> Get(GetQualityAssurance request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<MonthlyQualityModel>> GetMonthlyQualityHistory(GetMonthlyQualityHistory request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<WorkerStatisticsModel> GetWorkerStatisticsByDefect(GetWorkerStatisticsByDefect request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<DefectStatisticModel> GetDefectStatisticsByUser(GetDefectStatisticsByUser request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<QuantityOperationReportModel>> GetQuantityReportByProduct(GetQuantityReportByProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<QuantityOperationReportModel> GetQuantityReportByOperation(GetQuantityReportByOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        
    }
}
