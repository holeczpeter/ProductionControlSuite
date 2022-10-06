using Hechinger.FSK.Application.Features;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

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
