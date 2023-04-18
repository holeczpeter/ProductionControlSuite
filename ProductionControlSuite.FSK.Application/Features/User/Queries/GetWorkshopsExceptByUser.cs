namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetWorkshopsExceptByUser : IRequest<IEnumerable<WorkshopUserItem>>
    {
        public int UserId { get; set; }
        public GetWorkshopsExceptByUser()
        {

        }
        public GetWorkshopsExceptByUser(int userId) => UserId = userId;

    }
}
