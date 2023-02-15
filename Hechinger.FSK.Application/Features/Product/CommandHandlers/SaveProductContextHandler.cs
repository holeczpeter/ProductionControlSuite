namespace Hechinger.FSK.Application.Features
{
    public class SaveProductContextHandler : IRequestHandler<SaveProductContext, Result<int>>
    {
        private readonly FSKDbContext context;
        public SaveProductContextHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Result<int>> Handle(SaveProductContext request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<int>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            var currentProduct = await context.Products.Where(x => x.Id == request.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            var currentWorkShop = await this.context.Workshops.Where(x => x.Id == request.WorkshopId && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
            if (currentWorkShop == null)
            {
                result.Errors.Add("workshop.notFound");
                return result;
            }
            if (currentProduct == null) currentProduct = new Product();
            currentProduct.Name = request.Name;
            currentProduct.Code = request.Code;
            currentProduct.TranslatedName = request.TranslatedName;
            currentProduct.Workshop = currentWorkShop;
            var productState = this.context.Entry(currentProduct).State;
            if (productState != EntityState.Modified && productState != EntityState.Unchanged) await this.context.Products.AddAsync(currentProduct, cancellationToken);

            //Törlés
            var currentOperations = await this.context.Operations.Where(x => x.ProductId == currentProduct.Id && x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
            var deletedOperationIds = currentOperations.Select(x => x.Id).Except(request.Operations.Select(x => x.Id));
            var deletedOperations = currentOperations.Where(x => deletedOperationIds.Contains(x.Id));
            foreach (var deletedOperation in deletedOperations)
            {
                deletedOperation.EntityStatus = EntityStatuses.Deleted;
                foreach (var deletedDefect in deletedOperation.Defects)
                {
                    deletedDefect.EntityStatus = EntityStatuses.Deleted;
                }
            }

            foreach (var operation in request.Operations)
            {
                var currentOperation = await context.Operations.Where(x => x.Id == operation.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);
               
                if (currentOperation == null) currentOperation = new Operation();
                currentOperation.Name = operation.Name;
                currentOperation.Code = operation.Code;
                currentOperation.TranslatedName = operation.TranslatedName;
                currentOperation.Norma = operation.Norma;
                currentOperation.OperationTime = operation.OperationTime;
                currentOperation.PpmGoal = operation.PpmGoal;
                currentOperation.Product = currentProduct;
                var operationState = this.context.Entry(currentOperation).State;
                if (operationState != EntityState.Modified && operationState != EntityState.Unchanged) await this.context.Operations.AddAsync(currentOperation, cancellationToken);

                //Törlés
                var currentDefects = await this.context.Defects.Where(x => x.OperationId == currentOperation.Id && x.EntityStatus == EntityStatuses.Active).ToListAsync(cancellationToken);
                var deletedDefectIds = currentDefects.Select(x => x.Id).Except(operation.Defects.Select(x => x.Id));
                var deletedDefects = currentDefects.Where(x => deletedDefectIds.Contains(x.Id));
                foreach (var deletedDefect in deletedDefects)
                {
                    deletedDefect.EntityStatus = EntityStatuses.Deleted;
                }

                foreach (var defect in operation.Defects)
                {
                    var currentDefect = await context.Defects.Where(x => x.Id == defect.Id && x.EntityStatus == EntityStatuses.Active).FirstOrDefaultAsync(cancellationToken);

                    if (currentDefect == null) currentDefect = new Defect();
                    currentDefect.Name = defect.Name;
                    currentDefect.Code = defect.Code;
                    currentDefect.TranslatedName = defect.TranslatedName;
                    currentDefect.DefectCategory = defect.DefectCategory;
                    currentDefect.Operation = currentOperation;
                    var defectState = this.context.Entry(currentDefect).State;
                    if (defectState != EntityState.Modified && defectState != EntityState.Unchanged) await this.context.Defects.AddAsync(currentDefect, cancellationToken);

                }
            }
            await context.SaveChangesAsync(cancellationToken);
            result.Message = "product.saveSuccesful";
            result.IsSuccess = true;
            result.Entities = currentProduct.Id;
            return result;
        }
    }
}
