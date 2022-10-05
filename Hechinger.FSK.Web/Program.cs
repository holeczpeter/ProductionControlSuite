using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);
var assembly = Assembly.Load("Hechinger.FSK.Application");
builder.Services.AddMediatR(assembly);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaStaticFiles();
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder => builder.WithOrigins().AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = "FSK/dist"; });
//ilder.Services.AddMvcCore(options => options.Filters.Add(typeof(ValidateModelStateAttribute))).AddControllersAsServices();
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
    //IssuerSigningKey = new SymmetricSecurityKey(UTF8.GetBytes(HREnvironment.TokenSecret)),
    ValidateIssuer = true,
    //ValidIssuer = Configuration["URL"],
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
});
var app = builder.Build();


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
