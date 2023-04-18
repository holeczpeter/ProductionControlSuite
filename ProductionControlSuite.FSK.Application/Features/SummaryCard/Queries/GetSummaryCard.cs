namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetSummaryCard : IRequest<SummaryCardDetailModel>
    {
        public int Id { get; set; }
        public GetSummaryCard() { }
        public GetSummaryCard(int id) => Id = id;
    }
}
