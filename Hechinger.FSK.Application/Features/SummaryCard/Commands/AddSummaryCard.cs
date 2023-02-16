namespace Hechinger.FSK.Application.Features
{
    public class AddSummaryCard : IRequest<Result<bool>>
    {

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string WorkerCode { get; set; }

        [Required]
        public int OperationId { get; set; }

        [Required]
        public int Quantity { get; set; }
        [Required]
        public int UserId { get; set; }
        public string Los { get; set; }

        public int ShiftId { get; set; }

        public IEnumerable<AddSummaryCardItem> Items { get; set; }
    }
}
