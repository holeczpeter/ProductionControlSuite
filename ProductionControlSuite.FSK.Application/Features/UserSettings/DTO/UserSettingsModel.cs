namespace ProductionControlSuite.FSK.Application.Features
{
    public class UserSettingsModel : BaseModel
    {
        public int Id { get; set; }
        public int LanguageId { get; set; }
        public int  PageSize { get; set; }
        public AvatarTypes AvatarType { get;  set; }
    }
}
