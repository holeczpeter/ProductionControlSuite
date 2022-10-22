using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features
{
    public class GetQualityAssurance : IRequest<QualityAssuranceProductModel>
    {
     
        public int ProductId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public GetQualityAssurance()
        {

        }
        public GetQualityAssurance(int productId, DateTime startDate, DateTime endDate)
        {
            this.ProductId = productId;
            this.StartDate = startDate;
            this.EndDate = endDate;
        }
    }
}
