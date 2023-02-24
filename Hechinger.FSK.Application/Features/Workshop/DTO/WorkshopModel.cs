namespace Hechinger.FSK.Application.Features
{
    public class WorkshopModel : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string StatusName { get;  set; }
    }
}
