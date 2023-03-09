using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections;

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
                    var summaryCards = items.GroupBy(x => x.hgyid).Select(x => new { summaryCard = x.Key, summaryCardItems = x }).ToList();
                    var operations = await this.context.Operations.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);
                    var shifts = await this.context.Shifts.Select(x => new { Id = x.Id }).ToListAsync(cancellationToken);
                    var defects = await this.context.Defects.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);

                    var jsonResult = new List<SummaryCardImportModel>();

                    var cards = new List<SummaryCard>();
                    var carditems = new List<SummaryCardItem>();
                    foreach (var summaryCardItem in summaryCards)
                    {
                        var shiftId = 1;
                        var db = 0;
                        DateTime date = DateTime.MinValue;
                        if (!DateTime.TryParse(summaryCardItem.summaryCardItems.First().Datum, out date))
                        {
                            foreach (var item in summaryCardItem.summaryCardItems)
                            {
                                var jsonItem = item;
                                jsonItem.IsSuccess = false;
                                jsonItem.ErrorText = "Hibás rekord, dátum nem megfelelő";
                                jsonItem.ErrorObject = summaryCardItem.summaryCardItems.First().Datum;
                                jsonResult.Add(jsonItem);
                            }
                            continue;
                        }
                        DateTime created = DateTime.MinValue;
                        if (!DateTime.TryParse(summaryCardItem.summaryCardItems.First().beido, out created))
                        {


                            foreach (var item in summaryCardItem.summaryCardItems)
                            {
                                var jsonItem = item;
                                jsonItem.IsSuccess = false;
                                jsonItem.ErrorText = "Hibás rekord, a rögzítés dátum nem megfelelő";
                                jsonItem.ErrorObject = summaryCardItem.summaryCardItems.First().beido;
                                jsonResult.Add(jsonItem);
                            }
                            continue;
                        }

                        if (date < firstDate) continue;
                        if (int.TryParse(summaryCardItem.summaryCardItems.First().muszak, out int j))
                        {
                            shiftId = shifts.Where(x => x.Id == j).Select(x => x.Id).FirstOrDefault();
                        }
                        else
                        {
                            foreach (var item in summaryCardItem.summaryCardItems)
                            {
                                var jsonItem = item;
                                jsonItem.IsSuccess = false;
                                jsonItem.ErrorText = "Hibás rekord, műszak nem találhat";
                                jsonItem.ErrorObject = summaryCardItem.summaryCardItems.First().muszak;
                                jsonResult.Add(jsonItem);
                            }
                            continue;
                        }

                        var operation = operations.Where(x => x.Code.Trim().ToUpper() == summaryCardItem.summaryCardItems.First().Muveletkod.Trim().ToUpper()).FirstOrDefault();
                        if (operation == null)
                        {

                            foreach (var item in summaryCardItem.summaryCardItems)
                            {
                                var jsonItem = item;
                                jsonItem.IsSuccess = false;
                                jsonItem.ErrorText = "Hibás rekord, művelet nem található";
                                jsonItem.ErrorObject = summaryCardItem.summaryCardItems.First().Muveletkod;
                                jsonResult.Add(jsonItem);
                            }
                            continue;
                        }

                        if (!int.TryParse(summaryCardItem.summaryCardItems.First().Gyartott_db, out db))
                        {

                            foreach (var item in summaryCardItem.summaryCardItems)
                            {
                                var jsonItem = item;
                                jsonItem.IsSuccess = false;
                                jsonItem.ErrorText = "Hibás rekord, darabszám nem konvertálható";
                                jsonItem.ErrorObject = summaryCardItem.summaryCardItems.First().Gyartott_db;
                                jsonResult.Add(jsonItem);
                            }
                            continue;
                        }

                        var creator = summaryCardItem.summaryCardItems.First().dolg_az;
                        string creatorValue = "";
                        if (UserMapper().TryGetValue(creator, out creatorValue)) { }
                        else creatorValue = "SYSTEM";
                        var userId = await this.context.Users.Where(x => x.Code == creatorValue).Select(x=>x.Id).FirstOrDefaultAsync(cancellationToken);
                        var summaryCard = new SummaryCard()
                        {
                            Date = date,
                            OperationId = operation.Id,
                            Quantity = db,
                            ShiftId = shiftId,
                            UserId = userId != 0 ? userId : 1,
                            WorkerCode = summaryCardItem.summaryCardItems.First().Dolgozo_kod,
                            Created = created,
                            Creator = creatorValue,
                            LastModified = DateTime.Now,
                            LastModifier = "SYSTEM",
                        };
                        cards.Add(summaryCard);

                        foreach (var i in summaryCardItem.summaryCardItems)
                        {
                            var hibadb = 0;
                            if (i.Hibakod == null)
                            {

                                var jsonItem1 = i;
                                jsonItem1.IsSuccess = false;
                                jsonItem1.ErrorText = "Hibás rekord, hibakód null";
                                jsonItem1.ErrorObject = i.Hibakod;
                                jsonResult.Add(jsonItem1);
                                continue;
                            }
                            var defect = defects.Where(x => x.Code.ToUpper() == i.Hibakod.ToUpper()).FirstOrDefault();
                            if (defect == null)
                            {
                                var jsonItem2 = i;
                                jsonItem2.IsSuccess = false;
                                jsonItem2.ErrorText = "Hibás rekord, hibakód nem található";
                                jsonItem2.ErrorObject = i.Hibakod;
                                jsonResult.Add(jsonItem2);
                                continue;

                            }
                            if (!int.TryParse(i.Hiba_db, out hibadb))
                            {
                                var jsonItem3 = i;
                                jsonItem3.IsSuccess = false;
                                jsonItem3.ErrorText = "Hibás rekord, hibás darabszám nem konvertálható";
                                jsonItem3.ErrorObject = i.Hiba_db;
                                jsonResult.Add(jsonItem3);
                                continue;

                            }

                            var summaryCardItemEntity = new SummaryCardItem()
                            {
                                DefectId = defect.Id,
                                Quantity = hibadb,
                                SummaryCard = summaryCard,
                                Created = created,
                                Creator = creatorValue,
                                LastModified = DateTime.Now,
                                LastModifier = "SYSTEM",
                            };
                            carditems.Add(summaryCardItemEntity);
                            var jsonItem = i;
                            jsonItem.IsSuccess = true;
                            jsonItem.ErrorText = "Sikeres";
                            jsonResult.Add(jsonItem);
                            continue;
                        }
                    }
                    await this.context.AddRangeAsync(carditems, cancellationToken);
                    await this.context.AddRangeAsync(cards, cancellationToken);
                    await this.context.SaveChangesAsync(cancellationToken);
                    var jsonResults = JsonConvert.SerializeObject(jsonResult);
                    File.WriteAllText("fsk_import_eredmeny.json", jsonResults);
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
        public Dictionary<string, string> UserMapper()
        {
            return new Dictionary<string, string>()
            {
                {"a.farkas"  ,"9536"    },
                {"a.paradi"  ,"9178"    },
                {"cs.feher"  ,"2190"    },
                {"csabieva"  ,"9392"    },
                {"d.deak"    ,"5127"    },
                {"e.baranyi" ,"9598"    },
                {"f.mondi"   ,"9124"    },
                {"FVarga"    ,"5003"    },
                {"g.deli"    ,"2006"    },
                {"j.barany"  ,"9441"    },
                {"IstvanKosa","9016"    },
                {"j.boka"    ,"1851"    },
                {"k.muranyi" ,"5125"    },
                {"n.varadi"  ,"9302"    },
                {"Pasztine"  ,"9376"    },
                {"s.solyom"  ,"9505"    },
                {"t.demeter" ,"1401"    },
                {"v.ando"    ,"9274"    },
                {"v.toth"    ,"9552"    },
                {"v.varadi"  ,"9296"    },
                {"zs.polovics","9066"   },
                {"monika.szabo","5171"   },
                {"zs.kurucz","5170"   }
            };
        }
    }

}
