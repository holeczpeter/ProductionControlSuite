namespace Hechinger.FSK.Application.Features
{
    public class SummaryModel: BaseModel
    {
        public string Title { get; set; }
        public string Value { get; set; }

        public string Currency { get; set; }
        public string Icon { get; set; }
        public string Subtitle { get; set; }
        public string Color { get; set; }
    }
}
