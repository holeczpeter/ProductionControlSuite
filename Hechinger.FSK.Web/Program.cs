using Hechinger.FSK.Application;
using Hechinger.FSK.Infrastructure;
using Hechinger.FSK.Infrastructure.Persistence;
using Hechinger.FSK.Web;
using Hechinger.FSK.Web.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.IO;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("hostsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables(prefix: "ASPNETCORE_");
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

builder.Host
    .UseSerilog((ctx, lc) => lc
    .MinimumLevel.Debug()
    .WriteTo.Console() 
    .WriteTo.File("logs/log.log", rollingInterval: RollingInterval.Day));

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddWebApplicationServices(builder.Configuration);
builder.Services.AddMemoryCache();
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

app.UseAuthentication();
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
    if (app.Environment.IsDevelopment()) 
    {
        spa.UseAngularCliServer(npmScript: "start");
    };

  
});
app.Run();
