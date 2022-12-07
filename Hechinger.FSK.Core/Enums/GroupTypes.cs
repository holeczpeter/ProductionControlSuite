using System.ComponentModel;

namespace Hechinger.FSK.Core.Enums
{
    public enum GroupTypes
    {
        /// <summary>
        /// Hibaösszesítő csoport
        /// </summary>
        [Description("Hibaösszesítő csoport")]
        Group = 0,

        /// <summary>
        /// "Hibaösszesítő"
        /// </summary>
        [Description("Hibaösszesítő")]
        Head = 1,

        /// <summary>
        /// "Hibaösszesítő elem"
        /// </summary>
        [Description("Hibaösszesítő elem")]
        Item = 2,
    }
}
