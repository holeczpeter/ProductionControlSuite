using System.ComponentModel;

namespace Hechinger.FSK.Core.Enums
{
    public enum MenuTypes
    {  
        /// <summary>
        /// Modul
        /// </summary>
        [Description("Modul")]
        Module = 0,

        /// <summary>
        /// Main
        /// </summary>
        [Description("Főmenü")]
        MainMenu = 1,

        /// <summary>
        /// SubMenu
        /// </summary>
        [Description("Menü")]
        SubMenu = 2,
    }
}
