namespace Hechinger.FSK.Application.Features
{
    public class GetDefectsCountHandler : IRequestHandler<GetDefectsCount, int>
    {
        private readonly FSKDbContext context;
        public GetDefectsCountHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<int> Handle(GetDefectsCount request, CancellationToken cancellationToken)
        {

            return await this.context.Defects.CountAsync(cancellationToken);
        }
    }
}
