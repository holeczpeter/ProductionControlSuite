﻿using System.ComponentModel;

namespace ProductionControlSuite.FSK.Core.Enums
{
    public enum Views
    {
        /// <summary>
        /// Nap
        /// </summary>
        [Description("Nap")]
        Day = 0,

        /// <summary>
        /// Hét
        /// </summary>
        [Description("Hét")]
        Week = 1,

        /// <summary>
        /// Hónap
        /// </summary>
        [Description("Hónap")]
        Month = 2,

        /// <summary>
        /// Év
        /// </summary>
        [Description("Év")]
        Year = 3,
    }
}
