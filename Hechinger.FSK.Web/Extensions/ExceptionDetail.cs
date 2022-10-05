using Newtonsoft.Json;

namespace Hechinger.FSK.Web.Extensions
{
    public class ExceptionDetail
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
