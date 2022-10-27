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
                LanguageId = request.LanguageId,
                PageSize = 25,
            };
            await this.context.AddAsync(user);

            //Workshops
            var currentRelation = await this.context.WorkShopUsers.Where(x => x.UserId == user.Id).ToListAsync();
            var removedIds = currentRelation.Select(x => x.WorkShopId).Except(request.Workshops.Select(x => x.Id));
            var removedRelations = currentRelation.Where(x => removedIds.Contains(x.WorkShopId));
            this.context.RemoveRange(removedRelations);
            
            var addedWorkshops = await this.context.WorkShops.Where(x => request.Workshops.Select(w => w.Id).Contains(x.Id)).ToListAsync();
            foreach (var item in addedWorkshops)
            {
                var newRelation = new WorkShopUser()
                {
                    User = user,
                    WorkShop = item,
                };
                await this.context.AddAsync(newRelation);
            }
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A felhasználó sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
