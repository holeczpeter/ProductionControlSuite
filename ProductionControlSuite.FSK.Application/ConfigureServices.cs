namespace ProductionControlSuite.FSK.Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
        
            services.AddMediatR(config => config.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
            services.AddTransient(typeof(IAuthenticationManager), typeof(AuthenticationManager));
            services.AddTransient(typeof(IOperationCache), typeof(OperationCache));
            services.AddTransient(typeof(IDefectCahche), typeof(DefectCahche));
            services.AddTransient(typeof(IQuantityService), typeof(QuantityService));
            services.AddTransient(typeof(IQualityService), typeof(QualityService));
            services.AddTransient(typeof(IPermissionService), typeof(PermissionService));
            services.AddTransient(typeof(IGroupReportService), typeof(GroupReportService));
            services.AddTransient(typeof(ITreeService), typeof(TreeService));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));
            return services;
        }
    }
}
