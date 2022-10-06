namespace Hechinger.FSK.Application.Features
{
    public class GetProduct : IRequest<ProductModel>
    {
        public int Id { get; set; }
        public GetProduct(int id) => Id = id;
    }
}
