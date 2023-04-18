namespace ProductionControlSuite.FSK.Application.Features
{
    public class DefectRequestParameters : RequestParameters
    {
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }

        public string OperationCode { get; set; }

        public string DefectCategoryName { get; set; }
    }
}
