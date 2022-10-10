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
                
                await context.SaveChangesAsync(cancellationToken);

                result.Message = "A felhasználó sikeresen módosítva";
                result.IsSuccess = true;
                return result;
            }
        }
    }
}
