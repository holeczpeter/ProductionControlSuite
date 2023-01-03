namespace Hechinger.FSK.Application.Features
{
    public class GetAllEntityGroupsHandler : IRequestHandler<GetAllEntityGroups, IEnumerable<TreeItem<EntityGroupModel>>>
    {
        private readonly FSKDbContext context;
        public GetAllEntityGroupsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<TreeItem<EntityGroupModel>>> Handle(GetAllEntityGroups request, CancellationToken cancellationToken)
        {

            var groups =  this.context.EntityGroups.Where(x => x.EntityStatus == EntityStatuses.Active).ToList().Select(item => new EntityGroupModel()
            {
                Id = item.Id,
                Name = item.Name,
                ParentId = item.ParentId != null ? item.ParentId.Value : 0,
                Order = item.Order,  
                TranslatedName = item.TranslatedName,
                GroupType = item.GroupType
            });

            var result = groups.GenerateTree(i => i.Id, i => i.ParentId);
            return result;

        }
    }
}

