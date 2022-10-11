using System.Security.Claims;

namespace Hechinger.FSK.Application.Common.Security
{
    public interface IAuthenticationManager
    {
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);

        /// <summary>
        /// Lejárat lekérdezése
        /// </summary>
        /// <returns></returns>
        TimeSpan GetExpiration();

        /// <summary>
        /// Token gerenálása
        /// </summary>
        /// <param name="claims">Claims</param>
        /// <returns>Generált token</returns>
        string GenerateSecurityToken(Claim[] claims);


        /// <summary>
        /// Token gerenálása
        /// </summary>
        /// <returns>Generált token</returns>
        string GenerateRefreshToken();
    }
}
