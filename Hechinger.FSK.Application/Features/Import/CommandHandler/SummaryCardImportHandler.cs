using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Hechinger.FSK.Application.Features.Import.CommandHandler
{
    public class SummaryCardImportHandler : IRequestHandler<SummaryCardImport, Result<IEnumerable<ImportError>>>
    {
        private readonly ILogger<SummaryCardImportHandler> logger;
        private readonly FSKDbContext context;
        public SummaryCardImportHandler(FSKDbContext context, ILogger<SummaryCardImportHandler> logger)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<Result<IEnumerable<ImportError>>> Handle(SummaryCardImport request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<IEnumerable<ImportError>>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var errors = new List<ImportError>();
            try
            {
                using (var reader = new StreamReader(request.File.OpenReadStream()))
                {
                    DateTime firstDate = new DateTime(DateTime.Now.Year, 1, 1);
                    var json = await reader.ReadToEndAsync();
                    List<SummaryCardImportModel> items = JsonConvert.DeserializeObject<List<SummaryCardImportModel>>(json);
                    var summaryCards = items.GroupBy(x => x.hgyid).Select(x => new { item = x.Key, items = x }).ToList();
                    var operations = await this.context.Operations.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);
                    var shifts = await this.context.Shifts.Select(x => new { Id = x.Id }).ToListAsync(cancellationToken);
                    var defects = await this.context.Defects.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);

                    var cards = new List<SummaryCard>();
                    var carditems = new List<SummaryCardItem>();
                    foreach (var item in summaryCards)
                    {
                        var shiftId = 1;
                        var db = 0;
                        DateTime date = DateTime.MinValue;
                        if (!DateTime.TryParse(item.items.First().Datum, out date))
                        {

                            this.logger.LogError($"Hibás rekord, dátum nem megfelelő:{item.items.First().Datum }");
                            errors.Add(new ImportError() { Type = "Hibagyűjtő", Code = "", ErrorText = $"Hibás rekord, dátum nem megfelelő:{item.items.First().Datum }" });
                            continue;
                        }
                        if (date < firstDate) continue;
                        if (int.TryParse(item.items.First().muszak, out int j))
                        {
                            shiftId = shifts.Where(x => x.Id == j).Select(x => x.Id).FirstOrDefault();
                        }
                        else
                        {
                            this.logger.LogError($"Hibás rekord, műszak nem található:{ item.items.First().muszak }");
                            errors.Add(new ImportError() { Type = "Hibagyűjtő", Code="", ErrorText = $"Hibás rekord, műszak nem található:{ item.items.First().muszak }" });
                        }

                        var operation = operations.Where(x => x.Code.ToUpper() == item.items.First().Muveletkod.ToUpper()).FirstOrDefault();
                        if (operation == null)
                        {
                            this.logger.LogError($"Hibás rekord, művelet nem található:{ item.items.First().Muveletkod }");
                            errors.Add(new ImportError() { Type = "Hibagyűjtő", Code = "", ErrorText = $"Hibás rekord, művelet nem található:{ item.items.First().Muveletkod }" });
                            continue;
                        }
                       
                        if (!int.TryParse(item.items.First().Gyartott_db, out db))
                        {
                            this.logger.LogError($"Hibás rekord, darabszám nem konvertálható:{ item.items.First().Gyartott_db }");
                            errors.Add(new ImportError() { Type = "Hibagyűjtő", Code = "", ErrorText = $"Hibás rekord, darabszám nem konvertálható:{ item.items.First().Gyartott_db }" });
                        }


                        var summaryCard = new SummaryCard()
                        {
                            Date = date,
                            OperationId = operation.Id,
                            Quantity = db,
                            ShiftId = shiftId,
                            UserId = 0,
                            WorkerCode = item.items.First().Dolgozo_kod,
                            Created = DateTime.Now,
                            Creator = "SYSTEM",
                            LastModified = DateTime.Now,
                            LastModifier = "SYSTEM",
                        };
                        cards.Add(summaryCard);

                        foreach (var i in item.items)
                        {
                            var hibadb = 0;
                            if (i.Hibakod == null)
                            {
                                this.logger.LogError($"Hibás rekord, hibakód nem található:{i.Hibakod }");
                                errors.Add(new ImportError() { Type = "Hibagyűjtő", Code = "", ErrorText = $"Hibás rekord, hibakód nem található:{i.Hibakod }" });
                                continue;
                            }
                            var defect = defects.Where(x => x.Code.ToUpper() == i.Hibakod.ToUpper()).FirstOrDefault();
                            if (defect == null)
                            {
                                this.logger.LogError($"Hibás rekord, hiba nem található:{i.Hibakod }");
                                errors.Add(new ImportError() { Type = "Hibagyűjtő", Code = "", ErrorText = $"Hibás rekord, hibakód nem található:{i.Hibakod }" });
                                continue;
                            }
                            if (!int.TryParse(i.Hiba_db, out hibadb))
                            {
                                this.logger.LogError($"Hibás rekord, hibás darabszám nem konvertálható:{i.Hiba_db }");
                                errors.Add(new ImportError() { Type = "Hibagyűjtő", Code = "", ErrorText = $"Hibás rekord, hibás darabszám nem konvertálható:{i.Hiba_db }" });
                            }

                            var summaryCardItem = new SummaryCardItem()
                            {
                                DefectId = defect.Id,
                                Quantity = hibadb,
                                SummaryCard = summaryCard,
                                Created = DateTime.Now,
                                Creator = "SYSTEM",
                                LastModified = DateTime.Now,
                                LastModifier = "SYSTEM",
                            };
                            carditems.Add(summaryCardItem);
                        }
                    }
                    await this.context.AddRangeAsync(carditems, cancellationToken);
                    await this.context.AddRangeAsync(cards, cancellationToken);
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
