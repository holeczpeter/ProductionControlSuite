﻿namespace Hechinger.FSK.Application.Features
{
    public class DeleteUserHandler : IRequestHandler<DeleteUser, Result<bool>>
    {
        private readonly FSKDbContext context;
        public DeleteUserHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(DeleteUser request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var current = await context.Users.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (current == null)
            {
                result.Errors.Add("A felhasználó nem található");
                return result;
            }
            current.EntityStatus = EntityStatuses.Deleted;
            foreach (var item in current.UserRoles)
            {
                item.EntityStatus = EntityStatuses.Deleted;
            }

            await context.SaveChangesAsync(cancellationToken);

            result.Message = "A felhasználó sikeresen törölve";
            result.IsSuccess = true;
            return result;
        }
    }
}