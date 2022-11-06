using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class SetDefaultRoleHandler : IRequestHandler<SetDefaultRole, Result<bool>>
    {
        private readonly FSKDbContext context;
        public SetDefaultRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(SetDefaultRole request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var defaultRole = await context.Roles.Where(x => x.IsDefault && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var current = await context.Roles.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("A szerepkör nem található");
                return result;
            }
            else
            {
                defaultRole.IsDefault = false;
                current.IsDefault = true;


                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A szerepkör sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }

        }
    }
}
