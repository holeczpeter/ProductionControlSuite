﻿namespace Hechinger.FSK.Application.Features
{
    public class WorkerCompare : BaseModel
    {
        public string WorkerCode { get; set; }
        public int Quantity { get; set; }

        public int DefectQuantity { get; set; }

        public int Ppm { get; set; }
    }
}
