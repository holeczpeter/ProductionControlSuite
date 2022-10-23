using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class GetQualityAssuranceHandler : IRequestHandler<GetQualityAssurance, QualityAssuranceProductModel>
    {
        private readonly FSKDbContext context;
        public GetQualityAssuranceHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        

        public async Task<QualityAssuranceProductModel> Handle(GetQualityAssurance request, CancellationToken cancellationToken)
        {

            var cards = this.context.SummaryCards.Where(x => x.Operation.ProductId == request.ProductId).Select(x => new {
                OperationId= x.OperationId,
                OperationCode = x.Operation.Code,
                Quantity = x.Quantity,  
                //PPM = 1000000 / x.Quantity * x.SummaryCardItems.GroupBy(g => g.DefectId).Select(g => g.Sum(c => c.Quantity))
            });
                


            var item = await this.context.Products.Where(x => x.Id == request.ProductId).Select(x => new QualityAssuranceProductModel()
            {
                ProductId = x.Id,
                ProductCode = x.Code,
                ProductName = x.Name,
                Operations = x.Operations.ToList().Select(op => new QualityAssuranceOperationItemModel
                {
                    OperationId = op.Id,
                    OperationCode = op.Code,
                    OperationName = op.Name,
                    Defects = op.Defects.Select(def => new QualityAssuranceDefectModel()
                    {
                        DefectId = def.Id,
                        DefectCode = def.Code,
                        DefectName = def.Name,
                        Category = def.DefectCategory,
                        SumQuantity = 10, //def.SummaryCardItems.GroupBy(g=> g.DefectId).Select(gl=> new { defectId = gl.Key, items= gl.ToList() }).Select(a=> a.items.Sum(c => c.Quantity)),
                        //SumPPM = def.SummaryCardItems.GroupBy(g => g.DefectId).Select(g => g.Sum(c => c.Quantity))
                       
                    })
                })
                
            }).FirstOrDefaultAsync();

            return item;
        }
    }
}
