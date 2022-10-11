namespace Hechinger.FSK.Application.Features
{
    public class GetMenuByRole : IRequest<IEnumerable<TreeItem<RoleMenuItem>>>
    {
        public int RoleId { get; set; }
        public GetMenuByRole() { }
        public GetMenuByRole(int roleId) => RoleId = roleId;
       
    }
}
