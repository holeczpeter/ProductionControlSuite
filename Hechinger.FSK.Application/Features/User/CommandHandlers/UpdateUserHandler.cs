using Hechinger.FSK.Application.Common;

namespace Hechinger.FSK.Application.Features
{
    public class UpdateUserHandler : IRequestHandler<UpdateUser, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateUserHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateUser request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Users.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A felhasználó nem található");
                return result;
            }
            else
            {
                current.FirstName = request.FirstName;
                current.LastName = request.LastName;
                current.Code = request.Code;
                current.RoleId = request.RoleId;
                current.LanguageId = request.LanguageId;

                if (request.Password != null) 
                {
                    var salt = Salt.Create();
                    var hash = Hash.Create(request.Password, salt);
                    bool isValid = Hash.Validate(request.Password, salt, hash);
                    current.Password = hash;
                    current.Salt = salt;
                    current.IsTemporary = true;
                    current.ChangePass = DateTime.Now;
                }
                //Workshops
                var currentRelation = await this.context.WorkShopUsers.Where(x => x.UserId == current.Id).ToListAsync();
                var removedIds = currentRelation.Select(x => x.WorkShopId).Except(request.Workshops.Select(x => x.Id));
                var removedRelations = currentRelation.Where(x => removedIds.Contains(x.WorkShopId));
                this.context.RemoveRange(removedRelations);

                var requestWorkshops = await this.context.WorkShops.Where(x => request.Workshops.Select(w => w.Id).Contains(x.Id)).ToListAsync();
                var addedRelation = requestWorkshops.Select(x => x.Id).Except(currentRelation.Select(x => x.WorkShopId));
                foreach (var item in addedRelation)
                {
                    var newRelation = new WorkShopUser()
                    {
                        User = current,
                        WorkShopId = item,
                    };
                    await this.context.AddAsync(newRelation);
                }

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A felhasználó sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
