namespace ProductionControlSuite.FSK.Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration) 
        {

            services.AddDbContext<FSKDbContext>(options =>
            {
                options.UseLazyLoadingProxies();
                options.UseSqlServer(configuration.GetConnectionString("FSK"));
            });
            return services;
        }
    }
}
