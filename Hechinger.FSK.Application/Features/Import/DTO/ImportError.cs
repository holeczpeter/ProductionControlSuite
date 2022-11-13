namespace Hechinger.FSK.Application.Features
{
    public class ImportError : BaseModel
    {
        public string Type { get; set; }

        public string Code { get; set; }

        public string ErrorText { get; set; }
    }
}
