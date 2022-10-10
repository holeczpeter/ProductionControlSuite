namespace Hechinger.FSK.Application.Features
{
    public class GetUserExceptRole : IRequest<IEnumerable<RoleUserItem>>
    {
        public int RoleId { get; set; }
        public GetUserExceptRole()
        {

        }    
        public GetUserExceptRole(int roleId) => RoleId = roleId;
        
    }
}
