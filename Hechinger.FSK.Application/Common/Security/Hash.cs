﻿using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;

namespace Hechinger.FSK.Application.Common
{
    public static class Hash
    {
        public static string Create(string value, string salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                                password: value,
                                salt: Encoding.UTF8.GetBytes(salt),
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 10000,
                                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(valueBytes);
        }

        // public static bool Validate(string value, string salt, string hash)  => Create(value, salt) == hash;

        public static bool Validate(string value, string salt, string hash)
        {
            var result = Create(value, salt) == hash;
            return result;
        }

    }
}
