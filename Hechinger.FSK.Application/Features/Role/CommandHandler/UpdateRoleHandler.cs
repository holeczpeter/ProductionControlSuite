using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class UpdateRoleHandler : IRequestHandler<UpdateRole, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateRole request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var defaultRole = await context.Roles.Where(x => x.IsDefault && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            var current = await context.Roles.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A szerepkör nem található");
                return result;
            }
            else
            {
                if (current.IsDefault !=  request.IsDefault) defaultRole.IsDefault = !request.IsDefault;

                current.Name = request.Name;
                current.TranslatedName = request.TranslatedName;
                current.ShortName = request.Code;
                current.IsDefault = request.IsDefault;
                

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A szerepkör sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
