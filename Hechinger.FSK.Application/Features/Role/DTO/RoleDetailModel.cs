namespace Hechinger.FSK.Application.Features
{
    public class RoleDetailModel : BaseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string TranslatedName { get; set; }

        public bool IsDefault { get; set; }
        public IEnumerable<RoleUserItem> Users { get; set; }
    }
   
}
