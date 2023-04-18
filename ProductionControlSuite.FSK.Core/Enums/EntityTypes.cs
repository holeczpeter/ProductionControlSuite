using System.ComponentModel;

namespace ProductionControlSuite.FSK.Core.Enums
{
    public enum EntityTypes
    {
        /// <summary>
        /// Termék
        /// </summary>
        [Description("Termék")]
        Product = 0,

        /// <summary>
        /// Művelet
        /// </summary>
        [Description("Művelet")]
        Operation = 1,

        /// <summary>
        /// Hiba
        /// </summary>
        [Description("Hiba")]
        Defect = 2,
    }
}
