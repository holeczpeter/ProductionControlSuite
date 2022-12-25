namespace Hechinger.FSK.Application.Features
{
    public class GetGroupReportHandler : IRequestHandler<GetGroupReport, GroupReportModel>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        public GetGroupReportHandler(FSKDbContext context, IQuantityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<GroupReportModel> Handle(GetGroupReport request, CancellationToken cancellationToken)
        {

            return new GroupReportModel();
        }
    }
}
