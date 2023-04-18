using System.ComponentModel;

namespace ProductionControlSuite.FSK.Core.Enums
{
    public enum EntityStatuses
    {   
       
        /// <summary>
        /// Aktív
        /// </summary>
        [Description("Aktív")]
        Active = 1,

        /// <summary>
        /// Törölt
        /// </summary>
        [Description("Törölt")]
        Deleted = 2,

        /// <summary>
        /// Inaktív
        /// </summary>
        [Description("Inaktív")]
        InActive = 3,
    }
}
