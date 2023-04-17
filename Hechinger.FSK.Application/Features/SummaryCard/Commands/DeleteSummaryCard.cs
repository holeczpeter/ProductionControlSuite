namespace Hechinger.FSK.Application.Features
{
    public class DeleteSummaryCard : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
