﻿using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;

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
        public async Task<IEnumerable<TreeItem<MenuItemModel>>> GetAll(GetAllMenuItem query, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(query, cancellationToken);
        }
       
    }
}
