namespace Hechinger.FSK.Application.Features
{
    public class GetOperationsByProduct : IRequest<IEnumerable<OperationModel>>
    {
        public int ProductId { get; set; }
        public GetOperationsByProduct()
        {

        }
        public GetOperationsByProduct(int productId) => ProductId = productId;
    }
}
