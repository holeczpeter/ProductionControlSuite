using Hechinger.FSK.Application.Features.Menu.DTO;
using Hechinger.FSK.Application.Features.Menu.Query;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hechinger.FSK.Web.Controllers
{
   
    public class MenuController : ControllerBase
    {
        private readonly IMediator mediator;

        public MenuController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
        [HttpGet]
        public async Task<IEnumerable<MenuItemModel>> GetAll(GetAllMenuItem query, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(query, cancellationToken);
        }
       
    }
}
