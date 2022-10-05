using System.ComponentModel;

namespace Hechinger.FSK.Core.Enums
{
    public enum DefectCategories
    {
        /// <summary>
        /// F0
        /// </summary>
        [Description("F0")]
        F0 = 1,

        /// <summary>
        /// Törölt
        /// </summary>
        [Description("F1")]
        F1 = 2,

        /// <summary>
        /// Inaktív
        /// </summary>
        [Description("F2")]
        F2 = 3,
    }
}
