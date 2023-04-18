namespace ProductionControlSuite.FSK.Application.Features.Import
{
    public class UpdateOperationTranslatedNameHandler : IRequestHandler<UpdateOperationImport, Result<IEnumerable<ImportError>>>
    {
        private readonly ILogger<UpdateOperationTranslatedNameHandler> logger;
        private readonly FSKDbContext context;
        public UpdateOperationTranslatedNameHandler(FSKDbContext context, ILogger<UpdateOperationTranslatedNameHandler> logger)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task<Result<IEnumerable<ImportError>>> Handle(UpdateOperationImport request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<IEnumerable<ImportError>>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();
            var products = await this.context.Products.ToListAsync(cancellationToken);
            var errors = new List<ImportError>();
            var results = new List<OperationImportItem>();
            try
            {
                NumberFormatInfo provider = new NumberFormatInfo();
                provider.NumberDecimalSeparator = ".";

                using (var reader = new StreamReader(request.File.OpenReadStream()))
                {
                    var json = await reader.ReadToEndAsync();

                    var model = JsonConvert.DeserializeObject<UpdateOperationTranslatedName>(json);
                    var items = model.Sheet1;
                    foreach (var item in items)
                    {
                        var currentOperation = await this.context.Operations.Where(x => x.Code.Trim().ToUpper() == item.muv_kod.Trim().ToUpper()).FirstOrDefaultAsync(cancellationToken);

                        var ppm = 1;
                        int.TryParse(item.muv_cel, out ppm);
                        if (currentOperation != null) 
                        {
                            currentOperation.PpmGoal = ppm;
                            currentOperation.TranslatedName = item.muv_nev_nemet;
                        }
                       
                        
                    }

                    await this.context.SaveChangesAsync(cancellationToken);
                   
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


