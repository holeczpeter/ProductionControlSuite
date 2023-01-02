﻿namespace Hechinger.FSK.Application.Features
{
    public class GetProductsByParameters : IRequest<IEnumerable<ProductModel>>
    {
        public ProductRequestParameters Parameters { get; set; }

        public GetProductsByParameters(ProductRequestParameters parameters)
        {
            Parameters = parameters;
        }

        public GetProductsByParameters()
        {

        }
    }
}
