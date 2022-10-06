using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class UpdateWorkshopHandler : IRequestHandler<UpdateWorkshop, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateWorkshopHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateWorkshop request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.WorkShops.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A műhely nem található");
                return result;
            }
            else
            {
                current.Name = request.Name;
                await context.SaveChangesAsync(cancellationToken);
                result.Message = "A műhely sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
