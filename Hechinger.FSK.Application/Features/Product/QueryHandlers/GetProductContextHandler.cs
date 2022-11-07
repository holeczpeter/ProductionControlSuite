using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class GetProductContextHandler : IRequestHandler<GetProductContext, ProductContext>
    {
        private readonly FSKDbContext context;
        public GetProductContextHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<ProductContext> Handle(GetProductContext request, CancellationToken cancellationToken)
        {
            return await context.Products.Where(x => x.EntityStatus == EntityStatuses.Active && x.Id == request.Id).Select(x => new ProductContext()
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                TranslatedName = !String.IsNullOrEmpty(x.TranslatedName) ? x.TranslatedName : x.Name,
                WorkshopId = x.WorkShop.Id,
                Operations = x.Operations.Where(op=> op.EntityStatus == EntityStatuses.Active).Select(operation => new OperationContext()
                {
                    Id = operation.Id,
                    Name = operation.Name,
                    TranslatedName = !String.IsNullOrEmpty(operation.TranslatedName) ? operation.TranslatedName : operation.Name,
                    Code = operation.Code,
                    Norma = operation.Norma,
                    OperationTime = operation.OperationTime,
                    Defects = operation.Defects.Where(d => d.EntityStatus == EntityStatuses.Active).Select(defect => new DefectContext() 
                    {
                        Id = defect.Id,
                        Name = defect.Name,
                        Code = defect.Code,
                        TranslatedName = !String.IsNullOrEmpty(defect.TranslatedName) ? defect.TranslatedName : defect.Name,
                        DefectCategory = defect.DefectCategory,
                    }).ToList()
                }).ToList(),
            }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
