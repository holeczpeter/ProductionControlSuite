using Hechinger.FSK.Application.Common;

namespace Hechinger.FSK.Application.Features
{
    public class GetAccessMenuHandler : IRequestHandler<GetAccessMenu, IEnumerable<TreeItem<MenuItemModel>>>
    {
        private readonly FSKDbContext context;
        public GetAccessMenuHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<TreeItem<MenuItemModel>>> Handle(GetAccessMenu request, CancellationToken cancellationToken)
        {
            var currentUser = await this.context.Users.Where(x => x.Id == request.UserId).FirstOrDefaultAsync();
            var menus = await this.context.MenuRoles.Where(x => x.EntityStatus == EntityStatuses.Active && x.RoleId == currentUser.RoleId).Select(menuRole => 
            new MenuItemModel()
            {
                Id = menuRole.Menu.Id,
                Title = menuRole.Menu.Name,
                TranslatedTitle = menuRole.Menu.TranslatedName,
                Icon = menuRole.Menu.Icon,
                Path = menuRole.Menu.Path,
                ParentId = menuRole.Menu.ParentId,
                Type = menuRole.Menu.MenuType
            }).ToListAsync();

            var result = menus.GenerateTree(i => i.Id, i => i.ParentId);
            return result;
        }
    }
}
