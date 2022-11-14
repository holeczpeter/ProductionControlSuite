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
            var current = await context.Users.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
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

              
                //Workshops
                var currentRelation = await this.context.WorkshopUsers.Where(x => x.UserId == current.Id).ToListAsync(cancellationToken);
                var removedIds = currentRelation.Select(x => x.WorkshopId).Except(request.Workshops.Select(x => x.Id));
                var removedRelations = currentRelation.Where(x => removedIds.Contains(x.WorkshopId));
                this.context.RemoveRange(removedRelations);

                var requestWorkshops = await this.context.Workshops.Where(x => request.Workshops.Select(w => w.Id).Contains(x.Id)).ToListAsync(cancellationToken);
                var addedRelation = requestWorkshops.Select(x => x.Id).Except(currentRelation.Select(x => x.WorkshopId));
                foreach (var item in addedRelation)
                {
                    var newRelation = new WorkshopUser()
                    {
                        User = current,
                        WorkshopId = item,
                    };
                    await this.context.WorkshopUsers.AddAsync(newRelation, cancellationToken);
                }

                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A felhasználó sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
