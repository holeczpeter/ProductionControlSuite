namespace ProductionControlSuite.FSK.Application.Features
{
    public class UpdateSummaryCardItem : IRequest<Result<bool>>
    {
        public int Id { get; set; }

        public int DefectId { get; set; }

        public int Quantity { get; set; }

        public string Comment { get; set; }
    }
}
