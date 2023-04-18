namespace ProductionControlSuite.FSK.Application.Features
{
    public class OperationModel: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string ProductTranslatedName { get; set; }
        public bool HasDefect { get;  set; }
        public int Order { get;  set; }
        public int PpmGoal { get; set; }
        public EntityStatuses Status { get; set; }
        public string StatusName { get;  set; }
        public int DefectsCount { get;  set; }
    }
}
