namespace Hechinger.FSK.Application.Features
{
    public class GetAllLanguagesHandler : IRequestHandler<GetAllLanguages, IEnumerable<LanguageModel>>
    {
        private readonly FSKDbContext context;
        public GetAllLanguagesHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<LanguageModel>> Handle(GetAllLanguages request, CancellationToken cancellationToken)
        {
            return await this.context.Languages.Where(x => x.EntityStatus == EntityStatuses.Active)
                .Select(language => new LanguageModel()
                {
                    Id = language.Id,
                    Name = language.Name,
                    TranslatedName = language.TranslatedName,
                }).ToListAsync(cancellationToken);
        }
    }
}
