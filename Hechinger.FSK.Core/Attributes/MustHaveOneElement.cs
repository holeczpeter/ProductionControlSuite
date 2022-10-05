
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace Hechinger.FSK.Core.Attributes
{
    public class MustHaveOneElementAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return value is IList { Count: > 0 };
        }
    }
}
