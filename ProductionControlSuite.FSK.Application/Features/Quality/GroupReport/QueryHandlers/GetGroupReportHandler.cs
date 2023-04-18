namespace ProductionControlSuite.FSK.Application.Features
{

    public class GetGroupReportHandler : IRequestHandler<GetGroupReport, GroupReportModel>
    {
   
        private readonly IGroupReportService groupReportService;
        public GetGroupReportHandler(IGroupReportService groupReportService)
        {
            this.groupReportService = groupReportService ?? throw new ArgumentNullException(nameof(groupReportService));
        }
        public async Task<GroupReportModel> Handle(GetGroupReport request, CancellationToken cancellationToken)
        {
            return await this.groupReportService.Get(request, cancellationToken);
        }
    }
}
