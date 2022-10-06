using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class UpdateShift : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ShortName { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public string TranslatedShortName { get; set; }
        [Required]
        public TimeSpan Start { get; set; }
        [Required]
        public TimeSpan End { get; set; }
    }
}
