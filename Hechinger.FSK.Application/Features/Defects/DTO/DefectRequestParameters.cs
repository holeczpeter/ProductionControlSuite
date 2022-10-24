using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class DefectRequestParameters : RequestParameters
    {
        public string OperationName { get; set; }

        public string OperationCode { get; set; }

        public string DefectCategoryName { get; set; }
    }
}
