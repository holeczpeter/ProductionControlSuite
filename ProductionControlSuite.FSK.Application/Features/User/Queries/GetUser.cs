namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetUser: IRequest<UserModel>
    {
        public int Id { get; set; }
        public GetUser() { }
        public GetUser(int id) => Id = id;
    }
}
