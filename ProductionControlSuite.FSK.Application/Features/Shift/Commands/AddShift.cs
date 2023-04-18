namespace ProductionControlSuite.FSK.Application.Features
{
    public class AddShift : IRequest<Result<bool>>
    {
        
        [Required]
        public string Name { get; set; }
        [Required]
        public string ShortName { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public string TranslatedShortName { get; set; }
        [Required]
        public TimeSpan Start { get; set; }
        [Required]
        public TimeSpan End { get; set; }
    }
}
