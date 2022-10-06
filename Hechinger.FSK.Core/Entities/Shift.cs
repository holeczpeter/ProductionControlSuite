namespace Hechinger.FSK.Core.Entities
{
    public class Shift : Entity
    {
        public string Name { get; set; }
        public string ShortName { get; set; }

     
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }

        public virtual ICollection<SummaryCard> SummaryCards { get; set; } = new HashSet<SummaryCard>();
    }
}
