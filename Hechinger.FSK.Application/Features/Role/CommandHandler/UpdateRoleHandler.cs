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
            var defaultRole = await context.Roles.Where(x => x.IsDefault && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var currentRole = await context.Roles.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentRole == null)
            {
                result.Errors.Add("A szerepkör nem található");
                return result;
            }
            else
            {
                if (currentRole.IsDefault !=  request.IsDefault) defaultRole.IsDefault = !request.IsDefault;

                currentRole.Name = request.Name;
                currentRole.TranslatedName = request.TranslatedName;
                currentRole.Code = request.Code;
                currentRole.IsDefault = request.IsDefault;

                //Menu
                var currentMenuRole = await this.context.MenuRoles.Where(x => x.RoleId == currentRole.Id && x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
                var deletedMenuIds = currentMenuRole.Select(x => x.MenuId).Except(request.Menu.Select(x => x.Id));
                var deletedMenu = currentMenuRole.Where(x => deletedMenuIds.Contains(x.MenuId));
                this.context.MenuRoles.RemoveRange(deletedMenu);
                foreach (var menu in request.Menu)
                {
                    var currentRoleAndMenu = currentMenuRole.Where(x => x.MenuId == menu.Id).FirstOrDefault();
                    if (currentRoleAndMenu == null) currentRoleAndMenu = new MenuRole();
                    currentRoleAndMenu.RoleId = currentRole.Id;
                    currentRoleAndMenu.MenuId = menu.Id;
                    var state = this.context.Entry(currentRoleAndMenu).State;
                    if (state != EntityState.Modified && state != EntityState.Unchanged) await this.context.MenuRoles.AddAsync(currentRoleAndMenu, cancellationToken);
                }

                var currentUsers = await this.context.Users.Where(x => x.RoleId == currentRole.Id).ToListAsync();
                var removedUserIds = currentUsers.Select(x => x.Id).Except(request.Users.Select(x => x.Id));
                var removedUsers = currentUsers.Where(x => removedUserIds.Contains(x.Id));
                foreach (var removedUser in removedUsers)
                {
                    removedUser.RoleId = defaultRole.Id;
                }
                var addedUsers = await this.context.Users.Where(x => x.RoleId != currentRole.Id && request.Users.Select(u => u.Id).Contains(x.Id) && x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
                foreach (var added in addedUsers)
                {
                    added.Role = currentRole;
                }


                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A szerepkör sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
