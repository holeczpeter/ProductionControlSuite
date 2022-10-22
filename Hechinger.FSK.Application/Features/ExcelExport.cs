using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    
    public class ExcelExport : BaseModel
    {
        public string[,] Body { get; set; }

        public byte[] File { get; set; }

        public string MimeType { get; set; }

        public string DocumentName { get; set; }
    }
}
