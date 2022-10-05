using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Hechinger.FSK.Web.Controllers
{
    public class ProductController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProductController(IMediator mediator)
        {

            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
    }
}
