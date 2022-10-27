namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshopsByUser : IRequest<IEnumerable<WorkshopUserItem>>
    {
        public int UserId { get; set; }
        public GetWorkshopsByUser()
        {

        }
        public GetWorkshopsByUser(int userId) => UserId = userId;
    }
}
