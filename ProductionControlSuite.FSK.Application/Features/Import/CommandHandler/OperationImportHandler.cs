namespace ProductionControlSuite.FSK.Application.Features.Import
{
    public class OperationImportHandler : IRequestHandler<OperationImport, Result<IEnumerable<ImportError>>>
    {
        private readonly ILogger<OperationImportHandler> logger;
        private readonly FSKDbContext context;
        public OperationImportHandler(FSKDbContext context, ILogger<OperationImportHandler> logger)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task<Result<IEnumerable<ImportError>>> Handle(OperationImport request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<IEnumerable<ImportError>>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var products = await this.context.Products.ToListAsync(cancellationToken);
            var errors = new List<ImportError>();
            try
            {
                NumberFormatInfo provider = new NumberFormatInfo();
                provider.NumberDecimalSeparator = ".";

                using (var reader = new StreamReader(request.File.OpenReadStream()))
                {
                    var json = await reader.ReadToEndAsync();
                    
                    var model  = JsonConvert.DeserializeObject<OperationImportModel>(json);
                    var items = model.Operations.Where(x=>x.ProductCode != null).ToList();
                    var allOperation = model.Operations.Where(o => products.Select(p => p.Code.Trim().ToUpper()).Contains(o.ProductCode.Trim().ToUpper()));
                    var allOperationCount = allOperation.Count();
                    var onlyOperations = allOperation.Where(x => x.Nr != "00");
                    var onlyOperationsCount = onlyOperations.Count();
                    var jsonResult = new List<OperationImportItem>();

                    foreach (var item in items)
                    {
                        var order = 1;
                        var orderAsString = item.Nr;
                        int.TryParse(orderAsString, out order);
                        if (item.Nr == "00")
                        {
                            item.IsSuccess = false;
                            item.ErrorText = "Csak termékkód";
                            item.ErrorObject = item.ProductCode;
                            jsonResult.Add(item);
                            continue;
                        }

                        if (item.ProductCode == null)
                        {
                            item.IsSuccess = false;
                            item.ErrorText = "Termékkód null";
                            item.ErrorObject = item.ProductCode;
                            jsonResult.Add(item);
                            continue;
                        }
                        var product = products.Where(x => x.Code.Trim().ToUpper() == item.ProductCode.Trim().ToUpper()).FirstOrDefault();
                        if(!string.IsNullOrEmpty(item.IsActive) && item.IsActive != "NULL" && item.IsActive.Trim().ToUpper() != item.ProductCode.Trim().ToUpper() && product == null)
                        {
                            product = products.Where(x => x.Code.Trim().ToUpper() == item.IsActive.Trim().ToUpper()).FirstOrDefault();
                        }
                        if (product == null) 
                        {
                            item.IsSuccess = false;
                            item.ErrorText = "Termékkód nem található";
                            item.ErrorObject = item.ProductCode;
                            jsonResult.Add(item);
                           
                            continue;
                        }
                        


                        double normVal = Convert.ToDouble(item.Norm, provider);
                        double opTimeVal = Convert.ToDouble(item.OperationTime, provider);
                        var componentQuantity = 1;
                        var ppmGoal = 100;

                        var operation = new Operation()
                        {
                            Code = item.OperationCode,
                            Name = item.Name,
                            ComponentQuantity = componentQuantity,
                            PpmGoal = ppmGoal,
                            Order = order,
                            Norma = normVal,
                            OperationTime = opTimeVal,
                            Product = product,
                            Created = DateTime.Now,
                            Creator = "SYSTEM",
                            LastModified = DateTime.Now,
                            LastModifier = "SYSTEM",
                            EntityStatus = order != 0 && item.IsActive == "NULL" ? EntityStatuses.InActive : EntityStatuses.Active
                        };
                        await this.context.AddAsync(operation, cancellationToken);
                        
                    }
                    
                    await this.context.SaveChangesAsync(cancellationToken);
                    var jsonResults = JsonConvert.SerializeObject(jsonResult);
                    File.WriteAllText("muvelet_import_eredmeny.json", jsonResults);
                    result.IsSuccess = true;
                    result.Message = "Sikeres import";
                    result.Entities = errors;
                    return result;
                }

               
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
                throw;
            }
        }
    }
}
