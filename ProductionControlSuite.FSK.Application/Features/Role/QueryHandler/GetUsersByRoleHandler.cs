namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetUsersByRoleHandler : IRequestHandler<GetUsersByRole, IEnumerable<RoleUserItem>>
    {
        private readonly FSKDbContext context;
        public GetUsersByRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<RoleUserItem>> Handle(GetUsersByRole request, CancellationToken cancellationToken)
        {
            return await this.context.Users.Where(x => x.RoleId == request.RoleId && x.EntityStatus == EntityStatuses.Active)
                .Select(x => new RoleUserItem()
                {
                    Id = x.Id,
                    Code = x.Code,
                    FullName = x.FullName,
                }).ToListAsync(cancellationToken);
        }
    }
}
