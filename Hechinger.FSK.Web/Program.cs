using Hechinger.FSK.Application.PipelineBehaviors;
using Hechinger.FSK.Core;
using Hechinger.FSK.Core.FSKDbContext;
using Hechinger.FSK.Web.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Serilog;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);
var assembly = Assembly.Load("Hechinger.FSK.Application");

builder.Host.UseSerilog((ctx, lc) => lc
    .MinimumLevel.Debug().WriteTo.File("logs/log.log", rollingInterval: RollingInterval.Day));
builder.Services.AddDbContext<FSKDbContext>(options =>
{
    options.UseLazyLoadingProxies();
    options.UseSqlServer(builder.Configuration.GetConnectionString("BBC"));
});

builder.Services.AddMediatR(assembly);
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaStaticFiles();
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder => builder.WithOrigins().AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "FSK/dist"; });
builder.Services.AddMvcCore(options => options.Filters.Add(typeof(ValidateModelStateAttribute))).AddControllersAsServices();
builder.Services.Configure<ForwardedHeadersOptions>(options => options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto);
builder.Services.Configure<FormOptions>(options => options.MultipartBodyLengthLimit = 600000000);
builder.Services.AddMemoryCache();
builder.Services.Configure<ApiBehaviorOptions>(options =>
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
builder.Services.AddHealthChecks();
builder.Services.AddMemoryCache();
var validationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(System.Text.UTF8Encoding.UTF8.GetBytes(FSKEnvironment.TokenSecret)),
    ValidateIssuer = true,
    ValidIssuer = builder.Configuration["URL"],
    ValidateAudience = false,
    ValidateLifetime = true,
    ClockSkew = TimeSpan.Zero,
};
builder.Services.AddSingleton(validationParameters);
builder.Services.AddAuthentication(options =>
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
var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    using IServiceScope serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
    using FSKDbContext context = serviceScope.ServiceProvider.GetService<FSKDbContext>();
    context?.Database.Migrate();

}
app.ConfigureExceptionHandler();
app.UseForwardedHeaders();
app.UseRouting();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute("default", "{controller}/{action}/{id?}");
});

app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "FSKClient";
    spa.UseAngularCliServer(npmScript: "start");
});
app.Run();
