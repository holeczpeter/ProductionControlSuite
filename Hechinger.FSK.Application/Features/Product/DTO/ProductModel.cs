namespace Hechinger.FSK.Application.Features
{
    public class ProductModel : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string TranslatedName { get; set; }
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public IEnumerable<OperationModel> Operations { get; set; }
    }
}
