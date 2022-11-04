namespace Hechinger.FSK.Application.Features
{
    public class UpdateOperationContext : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public int ProductId { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }

        public IEnumerable<UpdateDefect> Defects { get; set; }
    }
}
