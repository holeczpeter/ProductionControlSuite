namespace Hechinger.FSK.Application.Features
{
    public class OperationImportModel
    {
        public List<OperationImportItem> Operations { get; set; }

    }
    public class OperationImportItem
    {
        public string OperationCode { get; set; }
        public string ProductCode { get; set; }
        public string ProductCode2 { get; set; }
        public string IsActive { get; set; }
        public string Nr { get; set; }
        public string OperationTime { get; set; }
        public string Name { get; set; }
        public string Norm { get; set; }
        public bool IsSuccess { get; set; }

        public string ErrorText { get; set; }

        public string ErrorObject { get; set; }
    }

}
