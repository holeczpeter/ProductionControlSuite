namespace Hechinger.FSK.Application.Features
{
    public class MenuItemModel : BaseModel
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string TranslatedTitle { get; set; }
        public string Icon { get; set; }

        public string Path { get; set; }

        public MenuTypes Type { get; set; }

        public long ParentId { get; set; }
        public int Order { get;  set; }
    }
}
