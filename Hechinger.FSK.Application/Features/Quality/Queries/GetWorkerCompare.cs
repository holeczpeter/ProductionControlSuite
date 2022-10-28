﻿namespace Hechinger.FSK.Application.Features
{
    public class GetWorkerCompare : IRequest<IEnumerable<WorkerCompare>>
    {
       
        public int DefectId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public GetWorkerCompare( int defectId, DateTime startDate, DateTime endDate)
        {
           
            DefectId = defectId;
            StartDate = startDate;
            EndDate = endDate;
        }
        public GetWorkerCompare()
        {

        }

    }
}
