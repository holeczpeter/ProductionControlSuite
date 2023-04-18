namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetMenuByRoleHandler : IRequestHandler<GetMenuByRole, IEnumerable<TreeItem<RoleMenuItem>>>
    {
        private readonly FSKDbContext context;
        public GetMenuByRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<TreeItem<RoleMenuItem>>> Handle(GetMenuByRole request, CancellationToken cancellationToken)
        {
            var menus = await this.context
                .Menus.Where(x => x.EntityStatus == EntityStatuses.Active && x.IsVisible)
                .Select(menu => new RoleMenuItem()
                {
                    Id = menu.Id,
                    Title = menu.Name,
                    ParentId = menu.ParentId,
                    Type = menu.MenuType,
                    IsEnabled = menu.MenuRoles.Where(mr => mr.RoleId == request.RoleId).Any()
                })
                .ToListAsync(cancellationToken);

            var result = menus.GenerateTree(i => i.Id, i => i.ParentId);
            return result;
        }
    }
}
