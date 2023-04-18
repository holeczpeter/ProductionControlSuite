namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetWorkshopByFilter : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}


