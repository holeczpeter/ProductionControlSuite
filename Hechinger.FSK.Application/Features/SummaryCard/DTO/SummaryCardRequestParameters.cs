using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class SummaryCardRequestParameters : RequestParameters
    {
        public string Date { get; set; }
        public string Created { get; set; }
        public string OperationCode { get; set; }
        public string OperationName { get; set; }
        public string OperationTranslatedName { get; set; }
        public string UserName { get; set; }
        public string ShiftName { get; set; }
        public string ShiftTranslatedName { get; set; }
        public string Quantity { get; set; }
        public string WorkerName { get; set; }
    }
}
