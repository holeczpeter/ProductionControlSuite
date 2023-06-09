﻿namespace ProductionControlSuite.FSK.Web.Controllers
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
        public async Task<QuantityOperationReportModel> GetQuantityReportByOperation(GetQuantityReportByOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<CrapCostProductModel> GetCrapCostByOperation(GetCrapCostByOperation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<CrapCostProductModel> GetCrapCostByProduct(GetCrapCostByProduct request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<CrapCostWorkshopModel> GetCrapCostByWorkshop(GetCrapCostByWorkshop request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }

        [HttpGet]
        public async Task<GroupReportModel> GetGroupReport(GetGroupReport request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<GroupReportYearlySummaryModel>> GetGroupReportYearlySummary(GetGroupReportYearlySummary request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }
}
