namespace Hechinger.FSK.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
    public class DisableLoggingAttribute : Attribute
    {
        public DisableLoggingAttribute()
        {
        }
    }
}
