namespace Hechinger.FSK.Application.Features
{
    public class GetQuantityReportByProduct : IRequest<IEnumerable<QuantityOperationReportModel>>
    {
        public int ProductId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetQuantityReportByProduct()
        {

        }
        public GetQuantityReportByProduct(int productId, DateTime startDate, DateTime endDate)
        {
            ProductId = productId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
