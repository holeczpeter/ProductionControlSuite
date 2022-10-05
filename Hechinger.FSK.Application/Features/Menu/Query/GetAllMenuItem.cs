using Hechinger.FSK.Application.Features.Menu.DTO;
using MediatR;

namespace Hechinger.FSK.Application.Features.Menu.Query
{
    public class GetAllMenuItem : IRequest<IEnumerable<MenuItemModel>>
    {
    }
}
