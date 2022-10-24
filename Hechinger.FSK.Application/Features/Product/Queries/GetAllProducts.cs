namespace Hechinger.FSK.Application.Features
{
    public class GetAllProducts : IRequest<IEnumerable<ProductModel>>
    {
        public ProductRequestParameters Parameters { get; set; }

        public GetAllProducts(ProductRequestParameters parameters)
        {
            Parameters = parameters;
        }

        public GetAllProducts()
        {

        }
    }
}
