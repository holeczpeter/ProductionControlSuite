using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Common
{

    public static class FskEnvironment
    {
        public static string TokenSecret = "GENERÁLT TITKOS STRING, EZ PEDIG EGY KIS L:l";
        public static string ExpirationInMinutes = "00:30:00";

        private static string appURL;
        public static string AppURL
        {
            get
            {
                return appURL;
            }
        }
        public static void SetConfiguration(IConfiguration configuration)
        {
            appURL = configuration["URL"];
        }

    }
}
