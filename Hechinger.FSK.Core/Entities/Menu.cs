namespace Hechinger.FSK.Core.Entities
{
    public class Menu: BaseEntity
    {
        public long ParentId { get; set; }
        public string DisplayName { get; set; }
        public string Path { get; set; }
        public string Icon { get; set; }
        public MenuTypes MenuType { get; set; }
        public int Order { get; set; }
        public bool IsVisible { get; set; }
        public virtual ICollection<MenuRole> MenuRoles { get; set; } = new HashSet<MenuRole>();
    }
}
