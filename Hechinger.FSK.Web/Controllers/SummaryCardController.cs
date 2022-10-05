using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Hechinger.FSK.Web.Controllers
{
    public class SummaryCardController : ControllerBase
    {
        private readonly IMediator mediator;

        public SummaryCardController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
    }
}
