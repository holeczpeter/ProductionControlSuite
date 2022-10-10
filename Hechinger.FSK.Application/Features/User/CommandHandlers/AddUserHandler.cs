namespace Hechinger.FSK.Application.Features
{
    public class AddUserHandler : IRequestHandler<AddUser, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddUserHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddUser request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var role = await this.context.Roles.Where(x=>x.Id == request.RoleId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            var user = new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,    
                Code = request.Code,
                IsTemporary = true,
                
            };
            await this.context.AddAsync(user);
            var userRole = new UserRole()
            {
                Role = role,
                User = user,
            };
            await this.context.AddAsync(userRole);

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A felhasználó sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
