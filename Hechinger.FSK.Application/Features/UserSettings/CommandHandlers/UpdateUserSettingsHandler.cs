using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class UpdateUserSettingsHandler : IRequestHandler<UpdateUserSettings, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateUserSettingsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateUserSettings request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var user = await this.context.Users.Where(x=>x.Id == request.Id).FirstOrDefaultAsync(cancellationToken);
            if (user == null)
            {
                result.Errors.Add("A felhasználó nem található");
                return result;
            }
            
            user.PageSize = request.PageSize;
            user.LanguageId = request.LanguageId;

            await context.SaveChangesAsync(cancellationToken);

            result.Message = "A módosítások elmentve";
            result.IsSuccess = true;
            return result;
        }
    }
}
