namespace Hechinger.FSK.Application.Common.Models
{
    public class TreeItem<T> 
    {
        public T Node { get; set; }
        public IEnumerable<TreeItem<T>> Children { get; set; }
        public bool Collapsed { get; set; }
    }
}
