using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Hechinger.FSK.Application.Features.Import.CommandHandler
{
    public class DefectImportHandler : IRequestHandler<DefectImport, Result<IEnumerable<ImportError>>>
    {
        private readonly ILogger<DefectImportHandler> logger;
        private readonly FSKDbContext context;
        public DefectImportHandler(FSKDbContext context, ILogger<DefectImportHandler> logger)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task<Result<IEnumerable<ImportError>>> Handle(DefectImport request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<IEnumerable<ImportError>>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var errors = new List<ImportError>();
            try
            {
                using (var reader = new StreamReader(request.File.OpenReadStream()))
                {
                    var json = await reader.ReadToEndAsync();
                    List<DefectImportModel> items = JsonConvert.DeserializeObject<List<DefectImportModel>>(json);
                    var count = items.Count();
                    var entities = new List<Defect>();
                   
                    var operations = await this.context.Operations.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);
                    foreach (var fehler in items.Select((value, i) => (value, i)))
                    {
                        int index = fehler.i;
                        var defectCategory = 1;
                        int.TryParse(fehler.value.Hibakategoria, out defectCategory);
                        var operation = operations.Where(x => fehler.value.Hibakod.Contains(x.Code)).FirstOrDefault();
                        if (operation == null)
                        {
                            this.logger.LogError($"Hibás rekord, művelet nem található:{ fehler.value.Hibakod }");
                            errors.Add(new ImportError() { Type = "Hibakód", Code = fehler.value.Hibakod, ErrorText = $"Hibás rekord, művelet nem található:{ fehler.value.Hibakod }" });
                            
                            continue;
                        }

                        var orderstring = fehler.value.Hibakod.Substring(fehler.value.Hibakod.Length - 2);

                        int.TryParse(orderstring, out int order);

                        var fehlerEntity = new Defect()
                        {
                            Code = fehler.value.Hibakod,
                            Name = fehler.value.Hiba_nev,
                            TranslatedName = fehler.value.Nemet_hiba_nev,
                            Order = order,
                            DefectCategory = (DefectCategories)defectCategory,
                            OperationId = operation.Id,
                            Created = DateTime.Now,
                            Creator = "SYSTEM",
                            LastModified = DateTime.Now,
                            LastModifier = "SYSTEM",


                        };
                        entities.Add(fehlerEntity);

                    }
                    await this.context.AddRangeAsync(entities, cancellationToken);
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
