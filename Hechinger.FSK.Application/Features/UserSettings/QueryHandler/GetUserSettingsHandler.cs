using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class GetUserSettingsHandler : IRequestHandler<GetUserSettings, UserSettingsModel>
    {
        private readonly FSKDbContext context;
        public GetUserSettingsHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<UserSettingsModel> Handle(GetUserSettings request, CancellationToken cancellationToken)
        {
            return await this.context.Users.Where(u => u.Id == request.Id).Select(u => new UserSettingsModel()
            {
                Id = u.Id,
                PageSize = u.PageSize,
                LanguageId = u.Language.Id,

            }).FirstOrDefaultAsync();
        }
    }
}
