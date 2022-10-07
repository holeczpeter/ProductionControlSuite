namespace Hechinger.FSK.Application.Features
{
    public class AddSummaryCardItem : IRequest<Result<bool>>
    {
        public int DefectId { get; set; }

        public int Quantity { get; set; }

        public string Comment { get; set; }
    }
}
