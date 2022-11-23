namespace Hechinger.FSK.Application.Features
{
    public class GetCrapCostByWorkshop : IRequest<CrapCostWorkshopModel>
    {
        public int WorkshopId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetCrapCostByWorkshop()
        {

        }
        public GetCrapCostByWorkshop(int workshopId, DateTime startDate, DateTime endDate)
        {
            WorkshopId = workshopId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
