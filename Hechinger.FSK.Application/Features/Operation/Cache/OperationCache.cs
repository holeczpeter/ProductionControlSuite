namespace Hechinger.FSK.Application
{

    public class OperationCache : IOperationCache
    {
        
        private readonly IMemoryCache memoryCache;
        private readonly FSKDbContext context;

        public OperationCache(IMemoryCache memoryCache, FSKDbContext context)
        {
            this.memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void AddCache(OperationModel[] workingDays, string key)
        {
            var options = new MemoryCacheEntryOptions
            {
                SlidingExpiration = TimeSpan.FromSeconds(10),
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(20)
            };
            this.memoryCache.Set<OperationModel[]>(key, workingDays);
        }
        public OperationModel[] GetCachedOperations()
        {
            OperationModel[] operations;

            if (!this.memoryCache.TryGetValue("OPERATION", out operations))
            {
                operations = this.context.Operations.Where(x=>x.EntityStatus==EntityStatuses.Active).Select(x => new OperationModel() 
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    TranslatedName = x.TranslatedName,
                    OperationTime = x.OperationTime,
                    Norma = x.Norma,
                    ProductId = x.ProductId,
                    ProductName = x.Product.Name,
                    ProductCode = x.Product.Code,
                }).ToArray();
                AddCache(operations, "OPERATION");

            }
            return operations;
        }
       
        public void ResetCache()
        {
            this.memoryCache.Remove("OPERATION");
            
        }
    }
}
