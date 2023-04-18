namespace ProductionControlSuite.FSK.Application.Features
{
    public class UserDataModel : BaseModel
    {
        public UserInfo UserInfo { get; set; }
        public string Token { get; set; }
        public string RefreshToken{ get; set; }
        public LoginResults LoginStatus { get; set; }
        public int PageSize { get; set; }
        public string LanguageCode { get; set; }
        public AvatarTypes AvatarType { get; set; }
        public IEnumerable<TreeItem<MenuItemModel>> AccessMenu { get; set; }
    }
    public class UserInfo 
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string RoleName { get; set; }
        public string RoleTranslatedName { get;  set; }
    }
}
