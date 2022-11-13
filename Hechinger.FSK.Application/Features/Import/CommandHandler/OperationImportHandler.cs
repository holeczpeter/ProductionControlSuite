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
            var errors = new List<ImportError>();
            try
            {
                NumberFormatInfo provider = new NumberFormatInfo();
                provider.NumberDecimalSeparator = ".";
                provider.NumberGroupSeparator = ",";
                using (var reader = new StreamReader(request.File.OpenReadStream()))
                {
                    var json = await reader.ReadToEndAsync();
                    
                    
                    List<OperationImportModel> items = JsonConvert.DeserializeObject<List<OperationImportModel>>(json);
                    var workshops = await this.context.Workshops.Select(x => new { Id = x.Id }).ToListAsync(cancellationToken);
                    var products = items.GroupBy(x => new { code = x.Termekszam, name = x.Termeknev, workshop = x.muhely }).Select(x => new
                    {
                        prodCode = x.Key.code,
                        prodName = x.Key.name,
                        workshop = x.Key.workshop,
                        operations = x.ToList()
                    }).ToList();
                    foreach (var product in products)
                    {
                        var workshopId = 1;
                        if (int.TryParse(product.workshop, out int j))
                        {
                            workshopId = workshops.Where(x => x.Id == j).Select(x => x.Id).FirstOrDefault();
                        }
                        else
                        {
                            this.logger.LogError($"Hibás rekord, műhely nem található:{ product.workshop }");
                            errors.Add(new ImportError() { Type = "Termék", Code = product.prodCode, ErrorText = $"Hibás rekord, műhely nem található:{ product.workshop }" });
                        }
                        var productEntity = new Product()
                        {

                            Code = product.prodCode,
                            Name = product.prodName,
                            TranslatedName = product.prodName,
                            WorkshopId = workshopId != 0 ? workshopId : 1,
                            Created = DateTime.Now,
                            Creator = "SYSTEM",
                            LastModified = DateTime.Now,
                            LastModifier = "SYSTEM",

                        };
                        await this.context.AddAsync(productEntity, cancellationToken);
                        foreach (var op in product.operations)
                        {
                            var orderAsString = op.muv_kod.Substring(op.muv_kod.Length - 2);
                            double doubleVal = Convert.ToDouble(op.Norma, provider);
                            var componentQuantity = 1;
                            var ppmGoal = 100;
                            var order = 1;
                            int.TryParse(orderAsString, out order);
                            int.TryParse(op.muv_alk_db, out componentQuantity);
                            int.TryParse(op.muv_cel, out ppmGoal);
                            int.TryParse(op.muv_cel, out ppmGoal);
                            var operation = new Operation()
                            {
                                Code = op.muv_kod,
                                Name = op.muv_nev,
                                ComponentQuantity = componentQuantity,
                                PpmGoal = ppmGoal,
                                Order = order,
                                TranslatedName = op.muv_nev_nemet,
                                Norma = doubleVal,
                                Product = productEntity,
                                Created = DateTime.Now,
                                Creator = "SYSTEM",
                                LastModified = DateTime.Now,
                                LastModifier = "SYSTEM",
                            };
                            await this.context.AddAsync(operation, cancellationToken);
                        }

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
