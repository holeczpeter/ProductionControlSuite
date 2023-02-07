﻿using Hechinger.FSK.Application.Common;
using System.Reflection;

namespace Hechinger.FSK.Web.Controllers
{
    public class ApplicationController : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ApplicationInfo> GetApplicationInformation()
        {
            Assembly currentAssembly = Assembly.GetExecutingAssembly();
            var res = new ApplicationInfo()
            {
                EnviromentName = FskEnvironment.EnvirontmentInformation == "TEST" ? "TESZT" : String.Empty,
                CopyRight = currentAssembly.GetCustomAttribute<AssemblyCopyrightAttribute>()?.Copyright ?? string.Empty,
                Version = currentAssembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.InformationalVersion ?? "",
            };

            return res;
        }     
    }
}