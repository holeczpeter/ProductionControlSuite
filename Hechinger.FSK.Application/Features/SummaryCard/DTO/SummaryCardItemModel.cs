namespace Hechinger.FSK.Application.Features
{
    public class SummaryCardItemModel: BaseModel
    {
        public int Id { get; set; }

        public int DefectId { get; set; }
        public string DefectName { get; set; }
        public int Quantity { get; set; }
        public int Order { get; set; }

        public string Comment { get; set; }
        public string DefectTranslatedName { get; internal set; }
    }
}
