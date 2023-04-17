namespace Hechinger.FSK.Application.Features
{
    public class DefectCahche : IDefectCahche
    {

        private readonly IMemoryCache memoryCache;
        private readonly FSKDbContext context;

        public DefectCahche(IMemoryCache memoryCache, FSKDbContext context)
        {
            this.memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void AddCache(DefectModel[] defects, string key)
        {
            var options = new MemoryCacheEntryOptions
            {
                SlidingExpiration = TimeSpan.FromSeconds(10),
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(20)
            };
            this.memoryCache.Set<DefectModel[]>(key, defects);
        }
        public DefectModel[] GetCachedDefects()
        {
            DefectModel[] defects;

            if (!this.memoryCache.TryGetValue("DEFECTS", out defects))
            {
                defects = context.Defects.Where(x => x.EntityStatus == EntityStatuses.Active).Select(x => new DefectModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = x.TranslatedName,
                    DefectCategory = x.DefectCategory,
                    DefectCategoryName = x.DefectCategory.GetDescription(),
                    OperationId = x.OperationId,
                    OperationCode = x.Operation.Code,
                    OperationName = x.Operation.Name,

                }).ToArray();
                AddCache(defects, "DEFECTS");

            }
            return defects;
        }

        public void ResetCache()
        {
            this.memoryCache.Remove("DEFECTS");

        }
    }
}
