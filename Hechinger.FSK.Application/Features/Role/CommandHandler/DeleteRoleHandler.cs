using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class DeleteRoleHandler : IRequestHandler<DeleteRole, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteRole request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var current = await context.Roles.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (current == null)
            {
                result.Errors.Add("role.notFound");
                return result;
            }
            current.EntityStatus = EntityStatuses.Deleted;

            var defaultRole = await context.Roles.Where(x => x.IsDefault && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);

            foreach (var item in current.Users)
            {
                item.Role = defaultRole;
            }

            await context.SaveChangesAsync(cancellationToken);

            result.Message = "role.deleteSuccesful";
            result.IsSuccess = true;
            return result;
        }
    }
}
