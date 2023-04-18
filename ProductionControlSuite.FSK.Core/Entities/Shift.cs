namespace ProductionControlSuite.FSK.Core.Entities
{
    public class Shift : BaseEntity
    {
        
        public string TranslatedCode { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public virtual ICollection<SummaryCard> SummaryCards { get; set; } = new HashSet<SummaryCard>();
    }
}
