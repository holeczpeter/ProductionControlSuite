namespace Hechinger.FSK.Application.Common
{

    public enum ConfirmationTypes
    {
        /// <summary>
        /// Információ
        /// </summary>
        [Description("Információ")]
        Information = 0,

        /// <summary>
        /// Figyelmeztetés
        /// </summary>
        [Description("Figyelmeztetés")]
        Warning = 1,

        /// <summary>
        /// Hiba
        /// </summary>
        [Description("Hiba")]
        Error = 2,

        /// <summary>
        /// Törlés megerősítése
        /// </summary>
        [Description("Törlés megerősítése")]
        Delete = 3,

        /// <summary>
        /// Sikeres művelet
        /// </summary>
        [Description("Sikeres művelet")]
        Success = 4,
    }
}
