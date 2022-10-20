using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class ForgotPassword : IRequest<Result<bool>>
    {
        [Required]
        public string Code { get; set; }
    }
}
