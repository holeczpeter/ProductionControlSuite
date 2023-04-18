namespace ProductionControlSuite.FSK.Application.Features
{
    public class UpdateWorkshop : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string TranslatedName { get; set; }

    }
}
