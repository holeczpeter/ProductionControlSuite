namespace ProductionControlSuite.FSK.Application.Features
{
    public class OperationRequestParameters : RequestParameters
    {
        public string ProductName { get; set; }

        public string ProductTranslatedName { get; set; }

        public string ProductCode { get; set; }

        public string OperationTime { get; set; }

        public string Norma { get; set; }

        public string DefectsCount { get; set; }

        public string PpmGoal { get; set; }
    }
}
