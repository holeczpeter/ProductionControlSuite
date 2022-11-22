namespace Hechinger.FSK.Application.Features
{
    public class MonthlyQualityModel : BaseModel
    {
        public int Year { get; set; }
        public string ProductName { get; set; }
        public string ProductTranslatedName { get; set; }
        public string ProductCode { get; set; }
        public DefectCategories Category { get; set; }
        public string CategoryName { get; set; }
        public IEnumerable<MonthlyQualityItem> Items { get; set; } = new List<MonthlyQualityItem>();
        public int Goal { get; set; }
        public double Avarage => Math.Round(Items.Select(x => x.Value).Average(), 2);
    }
}
