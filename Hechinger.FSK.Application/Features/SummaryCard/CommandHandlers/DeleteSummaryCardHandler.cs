using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class DeleteSummaryCardHandler : IRequestHandler<DeleteSummaryCard, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteSummaryCardHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteSummaryCard request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.SummaryCards.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("summaryCard.notFound");
                return result;
            }
            else
            {
                current.EntityStatus = EntityStatuses.Deleted;
                foreach (var item in current.SummaryCardItems)
                {
                    item.EntityStatus = EntityStatuses.Deleted;
                }

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "summaryCard.deleteSuccesful";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
