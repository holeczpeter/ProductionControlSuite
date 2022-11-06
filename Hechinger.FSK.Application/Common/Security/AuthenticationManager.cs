
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Hechinger.FSK.Application.Common.Security
{
    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly string secret;
        private readonly TimeSpan expDate;
        public AuthenticationManager()
        {
            this.secret = FskEnvironment.TokenSecret;
            this.expDate = TimeSpan.Parse(FskEnvironment.ExpirationInMinutes);
        }
        public TimeSpan GetExpiration()
        {
            return this.expDate;
        }

        public string GenerateSecurityToken(Claim[] claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.Add(expDate),
                Issuer = FskEnvironment.AppURL,
                SigningCredentials = creds
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
        public Claim GetClaim(string token, string type)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.ReadJwtToken(token)?.Payload.Claims.Where(x => x.Type == type).FirstOrDefault();
        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;
                var expvalidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                    ValidateIssuer = true,
                    ValidIssuer = FskEnvironment.AppURL,
                    ValidateAudience = false,
                    ValidateLifetime = false
                };
                var principal = tokenHandler.ValidateToken(token, expvalidationParameters, out securityToken);
                var jwtSecurityToken = securityToken as JwtSecurityToken;
                if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase)) return null;

                return principal;
            }
            catch
            {
                return null;
            }
        }

        public bool IsJwtWithValidSecirityAlgorithm(SecurityToken validatedToken)
        {
            return (validatedToken is JwtSecurityToken jwtSecurityToken) &&
               !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

        }
    }
}
