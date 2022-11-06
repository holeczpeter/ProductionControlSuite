namespace Hechinger.FSK.Application.Features
{
    public class AddRoleHandler : IRequestHandler<AddRole, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddRole request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var currentRole = new Role()
            {
                Name = request.Name,
                ShortName = request.Code,
                TranslatedName = request.TranslatedName,  
                IsDefault = request.IsDefault,  
            };
            await this.context.AddAsync(currentRole, cancellationToken);
            
            var defaultRole = await this.context.Roles.Where(x=>x.EntityStatus == EntityStatuses.Active && x.IsDefault).FirstOrDefaultAsync(cancellationToken);  
            
            
            //Menu
            var currentMenuRole = this.context.MenuRoles.Where(x => x.RoleId == currentRole.Id && x.EntityStatus == EntityStatuses.Active).ToList();
            var deletedMenuIds = currentMenuRole.Select(x => x.MenuId).Except(request.Menu.Select(x => x.Id));
            var deletedMenu = currentMenuRole.Where(x => deletedMenuIds.Contains(x.MenuId));
            this.context.MenuRoles.RemoveRange(deletedMenu);
            foreach (var menu in request.Menu)
            {
                var currentRoleAndMenu = currentMenuRole.Where(x => x.MenuId == menu.Id).FirstOrDefault();
                if (currentRoleAndMenu == null) currentRoleAndMenu = new MenuRole();
                currentRoleAndMenu.Role = currentRole;
                currentRoleAndMenu.MenuId = menu.Id;
                var state = this.context.Entry(currentRoleAndMenu).State;
                if (state != EntityState.Modified && state != EntityState.Unchanged) await this.context.MenuRoles.AddAsync(currentRoleAndMenu, cancellationToken);
            }

            //Users
            var currentUsers = await this.context.Users.Where(x => x.RoleId == currentRole.Id x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
            var removedUserIds = currentUsers.Select(x => x.Id).Except(request.Users.Select(x => x.Id));
            var removedUsers = currentUsers.Where(x => removedUserIds.Contains(x.Id));
            foreach (var removedUser in removedUsers)
            {
                removedUser.RoleId = defaultRole.Id;
            }
            var addedUsers = await this.context.Users.Where(x => x.RoleId != currentRole.Id && request.Users.Select(u=>u.Id).Contains(x.Id) x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
            foreach (var added in addedUsers)
            {
                added.Role = currentRole;
            }

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A szerepkör sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
