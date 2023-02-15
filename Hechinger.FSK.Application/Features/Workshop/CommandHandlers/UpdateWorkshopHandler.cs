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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Workshops.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("workshop.notFound");
                return result;
            }
            else
            {
                current.Name = request.Name;
                current.TranslatedName = request.TranslatedName;

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "workshop.updateSuccesful";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
