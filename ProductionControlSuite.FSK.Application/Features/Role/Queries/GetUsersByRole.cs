namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetUsersByRole : IRequest<IEnumerable<RoleUserItem>>
    {
        public int RoleId { get; set; }
        public GetUsersByRole()
        {

        }
        public GetUsersByRole(int roleId) => RoleId = roleId;
    }
}
