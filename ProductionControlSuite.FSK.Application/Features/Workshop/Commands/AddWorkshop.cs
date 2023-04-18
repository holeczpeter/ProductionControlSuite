namespace ProductionControlSuite.FSK.Application.Features
{
    public class AddWorkshop : IRequest<Result<bool>>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string TranslatedName { get; set; }
    }
}
