﻿namespace Hechinger.FSK.Application.Features
{
    public class DashboardCrapCost : BaseModel
    {
        public int WorkshopId { get; set; }
        public string WorkshopName { get; set; }
        public double Value { get; set; }
    }
}
