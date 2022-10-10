namespace Hechinger.FSK.Application.Features
{
    public class AddRoleHandler : IRequestHandler<AddRole, Result<bool>>
    {
        private readonly FSKDbContext context;
        public AddRoleHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(AddRole request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var role = new Role()
            {
                Name = request.Name,
                ShortName = request.Code,
                TranslatedName = request.TranslatedName,  
                IsDefault = request.IsDefault,  
            };
            await this.context.AddAsync(role);
           

            await this.context.SaveChangesAsync(cancellationToken);

            result.Message = "A szerepkör sikeresen létrehozva";
            result.IsSuccess = true;
            return result;
        }
    }
}
