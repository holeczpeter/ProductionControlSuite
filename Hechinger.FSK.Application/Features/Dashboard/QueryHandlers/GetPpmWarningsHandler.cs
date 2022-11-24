namespace Hechinger.FSK.Application.Features
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
            var workshops = await this.context.Workshops
                .AsNoTracking()
                .Select(w => new { Id = w.Id, Name = w.Name })
                .ToListAsync(cancellationToken);

            var items = await this.context.SummaryCardItems
                .Where(sc => sc.SummaryCard.Date.Date >= request.StartDate.Date.Date &&
                             sc.SummaryCard.Date.Date <= request.EndDate.Date &&
                             sc.SummaryCard.OperationId == 4811 &&
                             sc.EntityStatus == EntityStatuses.Active)
                .Select(sc => new
                {
                    OperationId = sc.SummaryCard.Operation.Id,
                    WorkerCode = sc.SummaryCard.WorkerCode,
                    Date = sc.SummaryCard.Date,
                    ShiftId = sc.SummaryCard.ShiftId,
                    SummaryGoal = sc.SummaryCard.Operation.PpmGoal,
                    Quantity = sc.SummaryCard.Quantity,
                    DefectQuantity = sc.Quantity,
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
                   var op = this.context.Operations.Where(x => x.Id == g.Key.OperationId).Select(x => new { Name = x.Name, Code = x.Code, TranslatedName = x.TranslatedName }).FirstOrDefault();
                   return new PpmWarning()
                   {
                       OperationId = g.Key.OperationId,
                       OperationCode = op != null ? op.Code : String.Empty,
                       OperationName = op != null ? op.Name : String.Empty,
                       OperationTranslatedName = op != null ? op.TranslatedName : String.Empty,
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

