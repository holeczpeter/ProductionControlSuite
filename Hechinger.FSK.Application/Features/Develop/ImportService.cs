using CsvHelper;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Globalization;

namespace Hechinger.FSK.Application.Features
{
    
    public class ImportOperationModel
    {
       // "muv_kod,"muv_nev","muv_nev_nemet","muv_cel","muv_alk_db","Termekszam","Termeknev","muhely","Norma","limit","aktiv"		

        public string muv_kod { get; set; }
        public string muv_nev { get; set; }

        public string muv_nev_nemet { get; set; }
        public string muv_cel { get; set; }
        public string muv_alk_db { get; set; }
        public string Termekszam { get; set; }
        public string Termeknev { get; set; }
        public string muhely { get; set; }
        public string Norma { get; set; }
        public string limit { get; set; }
        public string aktiv { get; set; }
    }

    public class ImportFehlerModel
    {
       

        public string Hibakod { get; set; }
        public string Hiba_nev { get; set; }

        public string Nemet_hiba_nev { get; set; }
        public string Hibakategoria { get; set; }
        public string sulyossag { get; set; }
        public string photolink { get; set; }
        public string kataloguskep { get; set; }
    }
    public class ImportCardItemModel
    {
        //hgyid,"az","Datum","Het","muszak","Dolgozo_kod","Rajzszam","Muveletkod","Gyartott_db","Hibakod","Hiba_db","Hibakategoria","dolg_az","beido","megjegyzes"

        public string hgyid { get; set; }
        public string az { get; set; }
        public string Datum { get; set; }
        public string Het { get; set; }

        public string muszak { get; set; }

        public string Dolgozo_kod { get; set; }

        public string Rajzszam { get; set; }

        public string Muveletkod { get; set; }

        public string Gyartott_db { get; set; }

        public string Hibakod { get; set; }

        public string Hiba_db { get; set; }

        public string Hibakategoria { get; set; }

        public string dolg_az { get; set; }

        public string beido { get; set; }

        public string megjegyzes { get; set; }
    }
    public class ImportService : IImportService
    {
        private readonly FSKDbContext context;
        private readonly ILogger<ImportService> logger;

        public ImportService(FSKDbContext context, ILogger<ImportService> logger)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
       
        public async Task<bool> ImportOperations(CancellationToken cancellationToken)
        {
            try
            {
                NumberFormatInfo provider = new NumberFormatInfo();
                provider.NumberDecimalSeparator = ".";
                provider.NumberGroupSeparator = ",";
                using (StreamReader r = new StreamReader("D:\\muveletek.json"))
                {
                    string json = r.ReadToEnd();
                    List<ImportOperationModel> items = JsonConvert.DeserializeObject<List<ImportOperationModel>>(json);
                    var workshops = await this.context.WorkShops.Select(x => new { Id = x.Id }).ToListAsync(cancellationToken);
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
                            this.logger.LogError($"Hibás rekord, nincs workshop:{ product.workshop }");
                        }
                        var productEntity = new Product()
                        {

                            Code = product.prodCode,
                            Name = product.prodName,
                            TranslatedName = product.prodName,
                            WorkShopId = workshopId != 0 ? workshopId : 1,


                        };
                        await this.context.AddAsync(productEntity, cancellationToken);
                        foreach (var op in product.operations)
                        {

                            double doubleVal = Convert.ToDouble(op.Norma, provider);
                            var operation = new Operation()
                            {
                                Code = op.muv_kod,
                                Name = op.muv_nev,
                                TranslatedName = op.muv_nev_nemet,
                                Norma = doubleVal,
                                Product = productEntity
                            };
                            await this.context.AddAsync(operation, cancellationToken);
                        }

                    }
                    await this.context.SaveChangesAsync(cancellationToken);
                }

                return true;

            }
            catch (Exception)
            {
                //return false;
                throw;
            }
        }

        public async Task<bool> ImportFehlers(CancellationToken cancellationToken)
        {
            try
            {
                using (StreamReader r = new StreamReader("D:\\hibakodok.json"))
                {
                    string json = r.ReadToEnd();
                    List<ImportFehlerModel> items = JsonConvert.DeserializeObject<List<ImportFehlerModel>>(json);
                    var count = items.Count();
                    var entities = new List<Defect>();
                    var fault = new List<ImportFehlerModel>();
                    var operations = await this.context.Operations.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);
                    foreach (var fehler in items.Select((value, i) => (value, i)))
                    {
                        int index = fehler.i;
                        var defectCategory = 1;
                        int.TryParse(fehler.value.Hibakategoria, out defectCategory);
                        var operation = operations.Where(x => fehler.value.Hibakod.Contains(x.Code)).FirstOrDefault();
                        if (operation == null) 
                        {
                            this.logger.LogError($"Hibás rekord, nincs operation:{ fehler.value.Hibakod }");
                            fault.Add(fehler.value);
                            continue;
                        }
                        
                        var orderstring = fehler.value.Hibakod.Substring(fehler.value.Hibakod.Length -2);

                        int.TryParse(fehler.value.Hibakategoria, out int order);

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
                    var jsons = JsonConvert.SerializeObject(fault);  
                    this.logger.LogError($"Hibás rekord, nincs operation:{ jsons}"); 
                }

                return true;

            }
            catch (Exception)
            {
                //return false;
                throw;
            }
        }

        public async Task<bool> ImportCards(CancellationToken cancellationToken)
        {
            try
            {
                using (StreamReader r = new StreamReader("D:\\hibagyujto2.json"))
                {
                    string json = r.ReadToEnd();
                    List<ImportCardItemModel> items = JsonConvert.DeserializeObject<List<ImportCardItemModel>>(json);
                    var summaryCards = items.GroupBy(x => x.hgyid).Select(x => new { item = x.Key, items = x }).ToList();
                    var operations = await this.context.Operations.Select(x=> new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);
                    var shifts = await this.context.Shifts.Select(x=> new { Id = x.Id }).ToListAsync(cancellationToken);
                    var defects =  await this.context.Defects.Select(x => new { Id = x.Id, Code = x.Code }).ToListAsync(cancellationToken);

                    var cards = new List<SummaryCard>();
                    var carditems = new List<SummaryCardItem>();
                    foreach (var item in summaryCards)
                    {
                        var shiftId = 1;
                        var db = 0;
                        DateTime date = DateTime.Now;
                        if (int.TryParse(item.items.First().muszak, out int j))
                        {
                            shiftId = shifts.Where(x => x.Id == j).Select(x => x.Id).FirstOrDefault();
                        }
                        else
                        {
                            this.logger.LogError($"Hibás rekord, nincs shift:{ item.items.First().muszak }");
                        }

                        var operation = operations.Where(x => x.Code.ToUpper() == item.items.First().Muveletkod.ToUpper()).FirstOrDefault();
                        if (operation == null)
                        {
                            this.logger.LogError($"Hibás rekord, nincs operation:{ item.items.First().Muveletkod }");
                            continue;
                        }
                        if (!DateTime.TryParse(item.items.First().Datum, out date))
                        {
                            this.logger.LogError($"Hibás rekord, nincs megfelelő dátum:{item.items.First().Datum }");
                            continue;
                        }
                        if (!int.TryParse(item.items.First().Gyartott_db, out db))
                        {
                            this.logger.LogError($"Hibás rekord, db nem convertálható:{ item.items.First().Gyartott_db }");
                        }
                        

                        var summaryCard = new SummaryCard()
                        {
                            Date = date,
                            OperationId = operation.Id,
                            Quantity = db,
                            ShiftId = shiftId,
                            UserId = 1,
                            WorkerCode = item.items.First().Dolgozo_kod
                        };
                        cards.Add(summaryCard);
                        
                        foreach (var i in item.items)
                        {
                            var hibadb = 0;
                            if (i.Hibakod == null) 
                            {
                                this.logger.LogError($"Hibás rekord, hiba nem található:{i.Hibakod }");
                                continue;
                            }
                            var defect = defects.Where(x => x.Code.ToUpper() == i.Hibakod.ToUpper()).FirstOrDefault();
                            if (defect == null)
                            {
                                this.logger.LogError($"Hibás rekord, hiba nem található:{i.Hibakod }");
                                continue;
                            }
                            if (!int.TryParse(i.Hiba_db, out hibadb))
                            {
                                this.logger.LogError($"Hibás rekord, db nem convertálható:{i.Hiba_db }");
                            }

                            var summaryCardItem = new SummaryCardItem()
                            {
                                DefectId = defect.Id,
                                Quantity = hibadb,
                                SummaryCard = summaryCard
                            };
                           carditems.Add(summaryCardItem);
                        }
                    }
                    await this.context.AddRangeAsync(carditems,cancellationToken);
                    await this.context.AddRangeAsync(cards, cancellationToken);
                    await this.context.SaveChangesAsync(cancellationToken);
                }

                return true;
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }
    }
}
