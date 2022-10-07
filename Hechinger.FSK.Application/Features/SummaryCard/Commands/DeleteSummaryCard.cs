using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class DeleteSummaryCard : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }

    }
}
