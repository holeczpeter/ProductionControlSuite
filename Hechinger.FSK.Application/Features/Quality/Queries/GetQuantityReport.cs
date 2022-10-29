namespace Hechinger.FSK.Application.Features
{
    public class GetQuantityReport : IRequest<QuantityProductReportModel>
    {
        public int ProductId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public GetQuantityReport()
        {

        }
        public GetQuantityReport(int productId, DateTime startDate, DateTime endDate)
        {
            ProductId = productId;
            StartDate = startDate;
            EndDate = endDate;
        }
    }
}
