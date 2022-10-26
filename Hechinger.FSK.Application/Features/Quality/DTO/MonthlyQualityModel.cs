namespace Hechinger.FSK.Application.Features
{
    public class MonthlyQualityModel : BaseModel
    {
        public DefectCategories Category { get; set; }
        public string CategoryName { get; set; }
        public IEnumerable<MonthlyQualityItem> Items { get; set; }
    }

   
}
