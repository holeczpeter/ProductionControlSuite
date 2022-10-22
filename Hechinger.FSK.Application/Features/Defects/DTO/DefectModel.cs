namespace Hechinger.FSK.Application.Features
{
    public class DefectModel : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationCode { get; set; }
        public string DefectCategoryName { get;  set; }
    }
}
