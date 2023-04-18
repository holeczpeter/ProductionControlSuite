namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetUsersExceptByRole : IRequest<IEnumerable<RoleUserItem>>
    {
        public int RoleId { get; set; }
        public GetUsersExceptByRole()
        {

        }    
        public GetUsersExceptByRole(int roleId) => RoleId = roleId;
        
    }
}
