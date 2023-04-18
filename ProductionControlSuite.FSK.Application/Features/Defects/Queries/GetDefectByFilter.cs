namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetDefectByFilter : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
