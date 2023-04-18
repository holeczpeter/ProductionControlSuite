namespace ProductionControlSuite.FSK.Application.Features
{
    public class UpdateSummaryCard : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
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

        public IEnumerable<UpdateSummaryCardItem> Items { get; set; }
    }
}
