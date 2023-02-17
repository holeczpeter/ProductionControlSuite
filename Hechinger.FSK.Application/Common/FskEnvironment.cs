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
        private static string environtmentInformation;

        public static string EnvirontmentInformation
        {
            get
            {
                return environtmentInformation;
            }
        }
        private static HelpCenter helpCenter;

        public static HelpCenter HelpCenter
        {
            get
            {
                return helpCenter;
            }
        }
        public static void SetConfiguration(IConfiguration configuration)
        {
            appURL = configuration["URL"];
            environtmentInformation = configuration["Environment"];
            IConfigurationSection helpCenterConfiguration = configuration.GetSection("HelpCenter");
            helpCenter = new HelpCenter
            {
                SupportName = helpCenterConfiguration["SupportName"] != null ? helpCenterConfiguration["SupportName"] : string.Empty,
                SupportContact = helpCenterConfiguration["SupportContact"] != null ? helpCenterConfiguration["SupportContact"] : string.Empty,
                ItName = helpCenterConfiguration["ITName"] != null ? helpCenterConfiguration["ITName"] : string.Empty,
                ItContact = helpCenterConfiguration["ITContact"] != null ? helpCenterConfiguration["ITContact"] : string.Empty,
                AdminName = helpCenterConfiguration["AdminName"] != null ? helpCenterConfiguration["AdminName"] : string.Empty,
                AdminContact = helpCenterConfiguration["AdminContact"] != null ? helpCenterConfiguration["AdminContact"] : string.Empty,
                
            };
        }

    }
}
