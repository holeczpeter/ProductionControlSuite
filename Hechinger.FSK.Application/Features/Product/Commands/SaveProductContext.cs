namespace Hechinger.FSK.Application.Features
{
    public class SaveProductContext : IRequest<Result<int>>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string TranslatedName { get; set; }
        public int WorkshopId { get; set; }
        public IEnumerable<OperationContext> Operations { get; set; } = new List<OperationContext>();
    }
}
