using System.ComponentModel;

namespace ProductionControlSuite.FSK.Core.Enums
{
    public enum  LoginResults
    {
        /// <summary>
        /// Sikeres bejelentkezés
        /// </summary>
        [Description("Sikeres bejelentkezés")]
        Success,

        /// <summary>
        /// Ideiglenes jelszó
        /// </summary>
        [Description("Ideiglenes jelszóval nem léphet be")]
        IsTemporaryPassword,

        /// <summary>
        /// Nem megfelelő jelszó
        /// </summary>
        [Description("Nem megfelelő jelszó")]
        IsNotValidPassword,

        /// <summary>
        /// Felhasználó nem létezik
        /// </summary>
        [Description("Felhasználó nem létezik")]
        NotExistUser,

        /// <summary>
        /// Token hiba
        /// </summary>
        [Description("Token hiba")]
        TokenError,
    }
}
