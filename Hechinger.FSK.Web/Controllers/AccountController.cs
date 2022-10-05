using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Hechinger.FSK.Web.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
    }
}
