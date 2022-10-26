namespace Hechinger.FSK.Application.Features
{
    public class GetMonthlyQualityHistory : IRequest<IEnumerable<MonthlyQualityModel>>
    {
        public int ProductId { get; set; }
        public int Year { get; set; }
    }
}
