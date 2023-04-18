namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetProductContext : IRequest<ProductContext>
    {
        public int Id { get; set; }
        public GetProductContext(int id) => Id = id;
        public GetProductContext()
        {

        }
    }
}
