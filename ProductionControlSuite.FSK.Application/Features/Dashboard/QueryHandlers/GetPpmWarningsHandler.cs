namespace ProductionControlSuite.FSK.Application.Features
{
    internal class GetPpmWarningsHandler : IRequestHandler<GetPpmWarnings, IEnumerable<PpmWarning>>
    {
        private readonly FSKDbContext context;
        private readonly IQualityService qualityService;
        public GetPpmWarningsHandler(FSKDbContext context, IQualityService qualityService)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.qualityService = qualityService ?? throw new ArgumentNullException(nameof(qualityService));
        }
        public async Task<IEnumerable<PpmWarning>> Handle(GetPpmWarnings request, CancellationToken cancellationToken)
        {
            var ops = await this.context.Operations.Where(x=>x.EntityStatus == EntityStatuses.Active)
                .AsNoTracking()
                .Select(x => new { Id = x.Id, Name = x.Name, Code = x.Code, TranslatedName = x.TranslatedName })
                .ToListAsync(cancellationToken);

            var workshops = await this.context.Workshops
                .AsNoTracking()
                .Select(w => new { Id = w.Id, Name = w.Name })
                .ToListAsync(cancellationToken);

            var items = await this.context.SummaryCards
               .Where(sc => sc.Date.Date >= request.StartDate.Date.Date &&
                            sc.Date.Date <= request.EndDate.Date &&
                            sc.EntityStatus == EntityStatuses.Active)
               .Select(sc => new
               {
                   OperationId = sc.Operation.Id,
                   WorkerCode = sc.WorkerCode,
                   Date = sc.Date,
                   ShiftId = sc.ShiftId,
                   SummaryGoal = sc.Operation.PpmGoal,
                   Quantity = sc.Quantity,
                   DefectQuantity = sc.DefectQuantity,
               }).ToListAsync(cancellationToken);
          

            var ppmResults = items
               .GroupBy(sc => new { 
                   OperationId = sc.OperationId, 
                   SummaryGoal = sc.SummaryGoal, 
                   WorkerCode = sc.WorkerCode, 
                   Date = sc.Date.Date, 
                   Shift = sc.ShiftId 
               })
               .Select(g =>
               {
                   var op = ops.Where(x => x.Id == g.Key.OperationId).Select(x=>x).FirstOrDefault();
                   return new PpmWarning()
                   {
                       OperationId = g.Key.OperationId,
                       OperationCode = op != null ? op.Code : String.Empty,
                       OperationName = op != null ? op.Name : String.Empty,
                       OperationTranslatedName = op != null ? !String.IsNullOrEmpty(op.TranslatedName) ? op.TranslatedName : op.Name : string.Empty,
                       Date = g.Key.Date,
                       SummaryGoal = g.Key.SummaryGoal,
                       ShiftId = g.Key.Shift,
                       Quantity = g.ToList().FirstOrDefault().Quantity,
                       DefectQuantity = g.ToList().Select(x => x.DefectQuantity).Sum(),
                       Ppm = this.qualityService.GetPpm(g.ToList().FirstOrDefault().Quantity, g.ToList().Select(x => x.DefectQuantity).Sum()),
                   };
               }).ToList();

            return ppmResults.Where(x=>x.SummaryGoal <= x.Ppm).OrderByDescending(x=>x.Ppm).ToList();  

        }
    }
}

