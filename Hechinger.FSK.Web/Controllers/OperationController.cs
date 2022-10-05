using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Hechinger.FSK.Web.Controllers
{
    public class OperationController : ControllerBase
    {
        private readonly IMediator mediator;

        public OperationController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
    }
}
