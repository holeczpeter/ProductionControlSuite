using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class GetProductSelectModelHandler : IRequestHandler<GetProductSelectModel, IEnumerable<SelectModel>>
    {
        private readonly FSKDbContext context;
        public GetProductSelectModelHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<SelectModel>> Handle(GetProductSelectModel request, CancellationToken cancellationToken)
        {
            return await context.Products
                .Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new SelectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = x.TranslatedName,
                })
                .Where(x=> x.Name.StartsWith(request.Filter) || x.Code.StartsWith(request.Filter) || string.IsNullOrEmpty(request.Filter))    
                .Take(25)
                .ToListAsync(cancellationToken);
        }
    }
}
