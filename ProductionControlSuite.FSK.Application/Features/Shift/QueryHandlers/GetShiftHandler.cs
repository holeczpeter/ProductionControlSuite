namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetShiftHandler : IRequestHandler<GetShift, ShiftModel>
    {
        private readonly FSKDbContext context;
        public GetShiftHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<ShiftModel> Handle(GetShift request, CancellationToken cancellationToken)
        {
            return await context.Shifts.Where(x => x.EntityStatus == EntityStatuses.Active && x.Id == request.Id)
                .Select(x => new ShiftModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    TranslatedName = x.TranslatedName,
                    ShortName = x.Code,
                    TranslatedShortName = x.Code,
                    Start = x.Start,
                    End = x.End,
                }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
