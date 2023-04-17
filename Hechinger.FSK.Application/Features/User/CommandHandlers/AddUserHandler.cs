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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var isCodeExist = await this.context.Users.Where(x=> x.Code.ToUpper().Trim() == request.Code.ToUpper().Trim() && x.EntityStatus == EntityStatuses.Active).AnyAsync(cancellationToken);
            if (isCodeExist)
            {
                result.Errors.Add("user.existingCode");
                return result;
            }
           
            var role = await this.context.Roles.Where(x => x.Id == request.RoleId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
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
            await this.context.AddAsync(user, cancellationToken);

            //Workshops
            var addedWorkshops = await this.context.Workshops.Where(x => request.Workshops.Select(w => w.Id).Contains(x.Id)).ToListAsync(cancellationToken);
            foreach (var item in addedWorkshops)
            {
                var newRelation = new WorkshopUser()
                {
                    User = user,
                    Workshop = item,
                };
                await this.context.AddAsync(newRelation, cancellationToken);
            }
            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "user.addSuccesful";
            result.IsSuccess = true;
            return result;
        }
    }
}
