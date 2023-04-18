namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetWorkshop : IRequest<WorkshopModel>
    {
        public int Id { get; set; }
        public GetWorkshop(int id) => Id = id;
    }
}
