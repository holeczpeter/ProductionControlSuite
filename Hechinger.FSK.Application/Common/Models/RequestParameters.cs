using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Common.Models
{
    
    public class RequestParameters
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string OrderBy { get; set; }
        public bool IsAsc { get; set; }

        private const int maxPageCount = 100;
        public int Page { get; set; } = 1;
        private int _pageCount = maxPageCount;
        public int PageCount
        {
            get { return _pageCount; }
            set { _pageCount = (value > maxPageCount) ? maxPageCount : value; }
        }
       

    }
    
}
