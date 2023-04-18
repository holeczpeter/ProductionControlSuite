namespace ProductionControlSuite.FSK.Application.Features
{
    public class DeleteEntityGroup : IRequest<Result<bool>>
    {
        public int Id { get; set; }
    }
}
