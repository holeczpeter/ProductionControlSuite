using System.ComponentModel;

namespace Hechinger.FSK.Core.Enums
{
    public enum DefectCategories
    {
        /// <summary>
        /// F0
        /// </summary>
        [Description("F0")]
        F0 = 0,

        /// <summary>
        /// Törölt
        /// </summary>
        [Description("F1")]
        F1 = 1,

        /// <summary>
        /// Inaktív
        /// </summary>
        [Description("F2")]
        F2 = 2,
    }
}
