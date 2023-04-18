namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetProductByFilter : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
