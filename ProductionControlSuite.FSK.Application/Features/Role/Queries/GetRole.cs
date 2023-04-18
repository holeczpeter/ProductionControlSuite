namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetRole : IRequest<RoleDetailModel>
    {
        public int Id { get; set; }
        public GetRole() { }
        public GetRole(int id) => Id = id;
    }
}
