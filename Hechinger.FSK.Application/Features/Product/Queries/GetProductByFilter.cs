using System.Collections.Generic;

namespace Hechinger.FSK.Application.Features
{
    public class GetProductByFilter : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
