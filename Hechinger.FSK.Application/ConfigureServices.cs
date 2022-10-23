using Hechinger.FSK.Application.Common.Security;
using Hechinger.FSK.Application.Features;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Hechinger.FSK.Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
        
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IAuthenticationManager), typeof(AuthenticationManager));
            services.AddTransient(typeof(IQualityService), typeof(QualityService));
            services.AddTransient(typeof(IImportService), typeof(ImportService));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));
            return services;
        }
    }
}
