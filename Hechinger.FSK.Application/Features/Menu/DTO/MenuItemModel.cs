namespace Hechinger.FSK.Application.Features.Menu.DTO
{
    public class MenuItemModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Icon { get; set; }

        public string Route { get; set; }

        public IEnumerable<MenuItemModel> SubMenuItems { get; set; }
    }
}
