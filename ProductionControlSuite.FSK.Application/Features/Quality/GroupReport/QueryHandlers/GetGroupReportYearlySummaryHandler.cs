namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetGroupReportYearlySummaryHandler : IRequestHandler<GetGroupReportYearlySummary, IEnumerable<GroupReportYearlySummaryModel>>
    {

        private readonly IGroupReportService groupReportService;
        public GetGroupReportYearlySummaryHandler(IGroupReportService groupReportService)
        {
            this.groupReportService = groupReportService ?? throw new ArgumentNullException(nameof(groupReportService));
        }
        public async Task<IEnumerable<GroupReportYearlySummaryModel>> Handle(GetGroupReportYearlySummary request, CancellationToken cancellationToken)
        {
            return await this.groupReportService.GetYearlySummary(request, cancellationToken);
        }
    }
}
