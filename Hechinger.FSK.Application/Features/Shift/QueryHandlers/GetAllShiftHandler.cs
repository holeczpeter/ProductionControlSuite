namespace Hechinger.FSK.Application.Features
{
    public class GetAllShiftHandler : IRequestHandler<GetAllShifts, IEnumerable<ShiftModel>>
    {
        private readonly FSKDbContext context;
        public GetAllShiftHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<ShiftModel>> Handle(GetAllShifts request, CancellationToken cancellationToken)
        {
            return await context.Shifts.Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(x => new ShiftModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    TranslatedName = x.TranslatedName,
                    ShortName = x.ShortName,
                    TranslatedShortName = x.ShortName,
                    Start = x.Start,
                    End = x.End,
                }).ToListAsync();
        }
    }
}
