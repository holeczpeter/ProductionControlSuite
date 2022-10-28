namespace Hechinger.FSK.Application.Features
{
    public class DefectCompareByUser : BaseModel
    {
        public string DefectCode { get; set; }
        public string DefectName { get; set; }
        public string DefectTranslatedName { get; set; }
        public DefectCategories DefectCategory { get; set; }
        public string DefectCategoryName { get; set; }
        public int Quantity { get; set; }
        public int DefectQuantity { get; set; }
        public int Ppm { get; set; }
    }
}
