namespace Hechinger.FSK.Application.Features
{
    public class GetCrapCostByProduct : IRequest<IEnumerable<CrapCostOperationModel>>
    {
        public int ProductId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetCrapCostByProduct()
        {

        }
        public GetCrapCostByProduct(int productId, DateTime startDate, DateTime endDate)
        {
            ProductId = productId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
