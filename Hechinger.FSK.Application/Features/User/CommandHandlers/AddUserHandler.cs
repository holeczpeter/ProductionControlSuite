using Hechinger.FSK.Application.Common;

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
            var role = await this.context.Roles.Where(x => x.Id == request.RoleId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            var salt = Salt.Create();
            var hash = Hash.Create(request.Password, salt);
            bool isValid = Hash.Validate(request.Password, salt, hash);
            var user = new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Code = request.Code,
                Password = hash,
                Salt = salt,
                IsTemporary = true,
                Role = role,
                LanguageId = request.LanguageId
            };
            await this.context.AddAsync(user);

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A felhasználó sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
