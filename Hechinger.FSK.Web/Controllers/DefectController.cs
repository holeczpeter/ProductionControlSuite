using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Hechinger.FSK.Web.Controllers
{
    public class DefectController : ControllerBase
    {
        private readonly IMediator mediator;

        public DefectController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
    }
}
