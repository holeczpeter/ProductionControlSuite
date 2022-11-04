using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class GetQuantityReportHandler : IRequestHandler<GetQuantityReport, IEnumerable<QuantityOperationReportModel>>
    {
        private readonly FSKDbContext context;
        private readonly IQuantityService quantityService;
        public GetQuantityReportHandler(FSKDbContext context, IQuantityService quantityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.quantityService = quantityService ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<QuantityOperationReportModel>> Handle(GetQuantityReport request, CancellationToken cancellationToken)
        {

            return await this.quantityService.Get(request.ProductId, request.StartDate, request.EndDate, cancellationToken);
        }
    }
}
