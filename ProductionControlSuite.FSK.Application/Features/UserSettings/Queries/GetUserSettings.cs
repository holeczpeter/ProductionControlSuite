namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetUserSettings : IRequest<UserSettingsModel>
    {
        public int Id { get; set; }
        public GetUserSettings() { }
        public GetUserSettings(int id) => Id = id;
    }
}
