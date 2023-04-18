namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetDefect : IRequest<DefectModel>
    {
        public int Id { get; set; }
        public GetDefect(int id) => Id = id;
    }
}
