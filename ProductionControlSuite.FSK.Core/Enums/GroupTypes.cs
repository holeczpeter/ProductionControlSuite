using System.ComponentModel;

namespace ProductionControlSuite.FSK.Core.Enums
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
        /// "Hibaösszesítő művelet fej"
        /// </summary>
        [Description("Hibaösszesítő művelet fej")]
        OperationItem = 2,

        /// <summary>
        /// "Hibaösszesítő hiba fej"
        /// </summary>
        [Description("Hibaösszesítő hiba fej")]
        DefectItem = 3,
    }
}
