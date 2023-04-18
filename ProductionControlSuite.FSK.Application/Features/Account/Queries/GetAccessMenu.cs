namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAccessMenu : IRequest<IEnumerable<TreeItem<MenuItemModel>>>
    {
        public int UserId { get; set; }
        public GetAccessMenu() { }
        public GetAccessMenu(int userId) => UserId = userId;
        
    }
}
