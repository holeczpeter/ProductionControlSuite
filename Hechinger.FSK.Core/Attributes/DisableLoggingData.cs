

namespace Hechinger.FSK.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
    public class DisableLoggingDataAttribute : Attribute
    {
        public DisableLoggingDataAttribute()
        {
        }
    }
}
