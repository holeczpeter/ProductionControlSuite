namespace Hechinger.FSK.Application.Features
{
    public class UpdateProductContextHandler : IRequestHandler<UpdateProductContext, Result<bool>>
    {
        private readonly FSKDbContext context;
        public UpdateProductContextHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<bool>> Handle(UpdateProductContext request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
   
            var currentWorkShop = await this.context.WorkShops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentWorkShop == null)
            {
                result.Errors.Add("A műhely nem található");
                return result;
            }

            var currentProduct = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync();
            if (currentProduct == null) currentProduct = new Product();
            currentProduct.Name = request.Name;
            currentProduct.Code = request.Code;
            currentProduct.TranslatedName = request.TranslatedName;
            currentProduct.WorkShop = currentWorkShop;
            
            var productState = this.context.Entry(currentProduct).State;
            if (productState != EntityState.Modified && productState != EntityState.Unchanged) await this.context.Products.AddAsync(currentProduct);
        


            //Műveletek
            var currentOperations = await this.context.Operations.Where(x => x.ProductId == request.Id).ToListAsync();
            var removedIds = currentOperations.Select(x => x.Id).Except(request.Operations.Select(x => x.Id));
            var removedOperation = currentOperations.Where(x => removedIds.Contains(x.Id));
            this.context.RemoveRange(removedOperation);

            foreach (var item in request.Operations)
            {
                var currentOperation = await this.context.Operations.Where(x => x.Id == item.Id).FirstOrDefaultAsync(cancellationToken);
                if (currentOperation == null) currentOperation = new Operation();
                currentOperation.Name = item.Name;
                currentOperation.Code = item.Code;
                currentOperation.TranslatedName = item.TranslatedName;
                currentOperation.Norma = item.Norma;
                currentOperation.OperationTime = item.OperationTime;
                currentOperation.Product = currentProduct;
                var operationState = this.context.Entry(currentOperation).State;
                if (operationState != EntityState.Modified && operationState != EntityState.Unchanged) await this.context.Operations.AddAsync(currentOperation);
                await this.context.AddAsync(currentOperation);


                //Hibák
                var currentDefects = await this.context.Defects.Where(x => x.OperationId == currentOperation.Id).ToListAsync();
                var removedDefectIds = currentDefects.Select(x => x.Id).Except(item.Defects.Select(x => x.Id));
                var removedDefect = currentDefects.Where(x => removedDefectIds.Contains(x.Id));
                this.context.RemoveRange(removedOperation);
                foreach (var defect in item.Defects)
                {
                    var currentDefect = await this.context.Defects.Where(x => x.Id == defect.Id).FirstOrDefaultAsync(cancellationToken);
                    if (currentDefect == null) currentDefect = new Defect();
                    currentDefect.Name = defect.Name;
                    currentDefect.Code = defect.Code;
                    currentDefect.TranslatedName = defect.TranslatedName;
                    currentDefect.DefectCategory = defect.DefectCategory;
                    currentDefect.Operation = currentOperation;
                    var defectState = this.context.Entry(currentDefect).State;
                    if (defectState != EntityState.Modified && operationState != EntityState.Unchanged) await this.context.Defects.AddAsync(currentDefect);
                    await this.context.AddAsync(currentDefect);
                }
            }



            await context.SaveChangesAsync(cancellationToken);
            result.Message = "A termék sikeresen módosítva";
            result.IsSuccess = true;
            return result;

        }
    }
}
