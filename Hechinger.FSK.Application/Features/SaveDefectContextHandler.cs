using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class SaveDefectContextHandler : IRequestHandler<SaveDefectContext, Result<int>>
    {
        private readonly FSKDbContext context;
        public SaveDefectContextHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<int>> Handle(SaveDefectContext request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<int>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            foreach (var item in request.Defects)
            {
                var current = await context.Defects.Where(x => x.Id == item.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
                var currentOperation = await this.context.Operations.Where(x => x.Id == item.OperationId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
                if (current == null) current = new Defect();
                current.Name = item.Name;
                current.Code = item.Code;
                current.TranslatedName = item.TranslatedName;
                current.DefectCategory = item.DefectCategory;
                current.Operation = currentOperation;
                var state = this.context.Entry(current).State;
                if (state != EntityState.Modified && state != EntityState.Unchanged) await this.context.Defects.AddAsync(current, cancellationToken);


            }
            await context.SaveChangesAsync(cancellationToken);
            result.Message = "A hibalista sikeresen mentve";
            result.IsSuccess = true;

            return result;
        }
    }
}
