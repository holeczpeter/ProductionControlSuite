using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Globalization;

namespace Hechinger.FSK.Application.Features.Import.CommandHandler
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
                NumberFormatInfo providerNorm = new NumberFormatInfo();
                providerNorm.NumberDecimalSeparator = ".";
                providerNorm.NumberGroupSeparator = ",";

                NumberFormatInfo provider = new NumberFormatInfo();
                provider.NumberDecimalSeparator = ".";
                provider.NumberGroupSeparator = ",";
                using (var reader = new StreamReader(request.File.OpenReadStream()))
                {
                    var json = await reader.ReadToEndAsync();
                    
                    
                    List<OperationImportModel> items = JsonConvert.DeserializeObject<List<OperationImportModel>>(json);
                    foreach (var item in items)
                    {
                        if (item.Termekszam == null)
                        {
                            this.logger.LogError($"Hibás rekord, termék nem található:{ item.muv_kod }");
                            errors.Add(new ImportError() { Type = "Művelet", Code = item.muv_kod, ErrorText = $"Hibás rekord, termék nem található:{ item.muv_kod }" });
                            continue;
                        }
                        var product = products.Where(x => x.Code == item.Termekszam.ToUpper()).FirstOrDefault();
                        if (product == null) 
                        {
                            this.logger.LogError($"Hibás rekord, termék nem található:{ item.Termekszam }");
                            errors.Add(new ImportError() { Type = "Művelet", Code = item.muv_kod, ErrorText = $"Hibás rekord, termék nem található:{ item.Termekszam }" });
                            continue;
                        }
                      
                       
                        var orderAsString = item.muv_kod.Substring(item.muv_kod.Length - 2);
                        double normVal = Convert.ToDouble(item.Norma, providerNorm);
                        double opTimeVal = Convert.ToDouble(item.muveleti_ido, provider);
                        var componentQuantity = 1;
                        var ppmGoal = 100;
                        var order = 1;
                        int.TryParse(orderAsString, out order);
                        int.TryParse(item.muv_alk_db, out componentQuantity);
                        int.TryParse(item.muv_cel, out ppmGoal);
                       
                        var operation = new Operation()
                        {
                            Code = item.muv_kod,
                            Name = item.muv_nev,
                            ComponentQuantity = componentQuantity,
                            PpmGoal = ppmGoal,
                            Order = order,
                            TranslatedName = item.muv_nev_nemet,
                            Norma = normVal,
                            OperationTime = opTimeVal,
                            Product = product,
                            Created = DateTime.Now,
                            Creator = "SYSTEM",
                            LastModified = DateTime.Now,
                            LastModifier = "SYSTEM",
                        };
                        await this.context.AddAsync(operation, cancellationToken);
                    }
                    
                    await this.context.SaveChangesAsync(cancellationToken);
                    this.logger.LogError($"Import eredmény: {JsonConvert.SerializeObject(errors)}");
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
