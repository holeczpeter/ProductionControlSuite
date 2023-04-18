namespace ProductionControlSuite.FSK.Application.Features
{
    public class UserModel : BaseModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int LanguageId { get; set; }
        public string LanguageName { get; set; }
        public EntityStatuses Status { get; set; }
        public string StatusName { get; set; }
        public IEnumerable<string> Workshops { get;  set; }
    }
}
