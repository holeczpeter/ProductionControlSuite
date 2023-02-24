using Hechinger.FSK.Application;
using Hechinger.FSK.Infrastructure;
using Hechinger.FSK.Infrastructure.Persistence;
using Hechinger.FSK.Web;
using Hechinger.FSK.Web.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
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
RewriteOptions rewriteOptions = new RewriteOptions().Add(new FixIisBaseProblem());
app.UseRewriter(rewriteOptions);
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute("default", "{controller}/{action}/{id?}");
});

app.UseStaticFiles();
app.UseSpaStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "FSKClient", app.Environment.IsDevelopment() ? "" : "dist"))
});
app.UseSpa(spa =>
{
    
    spa.Options.SourcePath = "FSKClient";
    spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "FSKClient", app.Environment.IsDevelopment() ? "" : "dist"))
    };
    if (app.Environment.IsDevelopment())
    {
        spa.UseAngularCliServer(npmScript: "start");
    }
});
app.Run();

internal sealed class FixIisBaseProblem : IRule
{
    public void ApplyRule(RewriteContext context)
    {
        HttpRequest request = context.HttpContext.Request;
        if (request.Path.HasValue) return;
        HttpResponse response = context.HttpContext.Response;
        response.StatusCode = StatusCodes.Status301MovedPermanently;
        response.Headers[HeaderNames.Location] = $"{request.PathBase}/";
        context.Result = RuleResult.EndResponse;
    }
}