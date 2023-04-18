namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllMenuItemHandler : IRequestHandler<GetAllMenuItem, IEnumerable<TreeItem<MenuItemModel>>>
    {
        private readonly FSKDbContext context;
        public GetAllMenuItemHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<TreeItem<MenuItemModel>>> Handle(GetAllMenuItem request, CancellationToken cancellationToken)
        {

            var menus = await this.context.Menus.Where(x => x.EntityStatus == EntityStatuses.Active && x.IsVisible).Select(menu => new MenuItemModel()
            {
                Id = menu.Id,
                Title = menu.Name,
                TranslatedTitle = menu.TranslatedName,
                Icon = menu.Icon,
                Path = menu.Path,
                ParentId = menu.ParentId,
                Type = menu.MenuType
            }).ToListAsync(cancellationToken);

            var result = menus.GenerateTree(i => i.Id, i => i.ParentId);
            return result;

        }
    }
}
