using Hechinger.FSK.Core.Attributes;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Reflection;

namespace Hechinger.FSK.Application.Common.Behaviours.PipelineBehaviors
{
    public class LoggingBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly ILogger<LoggingBehaviour<TRequest, TResponse>> logger;

        public LoggingBehaviour(ILogger<LoggingBehaviour<TRequest, TResponse>> logger)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            Type requestType = request.GetType();
            var disable = requestType.GetCustomAttributes(typeof(DisableLoggingAttribute), false).FirstOrDefault() as DisableLoggingAttribute;

            var response = await next();
            if (disable == null)
            {
                Type responseType = response?.GetType();
                var requestData = requestType.GetCustomAttribute<DisableLoggingDataAttribute>() != null ? string.Empty : JsonConvert.SerializeObject(request);
                var responseData = responseType?.GetCustomAttribute<DisableLoggingDataAttribute>() != null ? string.Empty : JsonConvert.SerializeObject(response);

                this.logger.LogInformation($"{DateTime.Now} - Handling {typeof(TRequest).Name} Küldött adat: {JsonConvert.SerializeObject(requestData)} ");
                this.logger.LogInformation($"{DateTime.Now} - Handling {typeof(TRequest).Name} - {typeof(TResponse).Name} Válasz: {JsonConvert.SerializeObject(responseData)} ");
            }
            return response;
        }
    }
}
