using System.Collections.Generic;

namespace Hechinger.FSK.Application.Features
{
    public class GetProductSelectModel : IRequest<IEnumerable<SelectModel>>
    {
        public string Filter { get; set; }
    }
}
