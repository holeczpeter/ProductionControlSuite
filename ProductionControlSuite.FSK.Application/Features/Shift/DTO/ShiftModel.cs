namespace ProductionControlSuite.FSK.Application.Features
{
    public class ShiftModel : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string TranslatedName { get; set; }
        public string TranslatedShortName { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
    }
}
