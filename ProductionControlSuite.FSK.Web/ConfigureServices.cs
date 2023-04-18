

namespace ProductionControlSuite.FSK.Web
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddWebApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers(options =>
            {
                options.Filters.Add(new ResponseCacheAttribute()
                {
                    NoStore = true,
                    Location = ResponseCacheLocation.None
                });
            }
            ).AddNewtonsoftJson(json =>
            {
                json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                json.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                
            });
            FskEnvironment.SetConfiguration(configuration); 
            services.AddHttpContextAccessor();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddSpaStaticFiles();
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder => builder.WithOrigins().AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
            services.AddMvcCore(options => options.Filters.Add(typeof(ValidateModelStateAttribute))).AddControllersAsServices();
            services.Configure<ForwardedHeadersOptions>(options => options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);
            services.Configure<FormOptions>(options => 
            {
          
                options.BufferBodyLengthLimit = int.MaxValue;
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = int.MaxValue; 
                options.MultipartHeadersLengthLimit = int.MaxValue;
            });
            

            services.Configure<IISServerOptions>(options =>
            {
                options.MaxRequestBodyBufferSize = int.MaxValue;
                options.MaxRequestBodySize = int.MaxValue;
            });

            services.Configure<KestrelServerOptions>(options =>
            {
                options.Limits.MaxRequestBufferSize = int.MaxValue;
                options.Limits.MaxRequestBodySize = int.MaxValue;
            });
            services.AddHttpClient();
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors =
                        actionContext.ModelState
                        .Where(e => e.Value != null && e.Value.Errors.Any())
                        .Select(e => new
                        {
                            Name = e.Key,
                            Message = e.Value != null ? e.Value.Errors.First().ErrorMessage : String.Empty,
                        })
                        .ToArray();
                    return new BadRequestObjectResult(errors);
                };
            });
            services.AddHealthChecks();
            services.AddMemoryCache();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(System.Text.UTF8Encoding.UTF8.GetBytes(FskEnvironment.TokenSecret)),
                ValidateIssuer = true,
                ValidIssuer = configuration["URL"],
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
            };
            services.AddSingleton(validationParameters);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = validationParameters;
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.Equals("/notification")))
                        {
                            // Read the token out of the query string
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            services.AddAuthorization();
            return services;
        }
    }
}
