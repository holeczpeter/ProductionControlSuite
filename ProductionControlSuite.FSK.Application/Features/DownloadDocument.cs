namespace ProductionControlSuite.FSK.Application.Features
{

    public class DownloadDocument : BaseModel
    {
        public byte[] File { get; set; }

        public string MimeType { get; set; }

        public string DocumentName { get; set; }
    }
}
