﻿namespace Hechinger.FSK.Application.Features.Dashboard.DTO
{
    public class SummaryModel: BaseModel
    {
        public string Title { get; set; }
        public string Value { get; set; }
        public string Icon { get; set; }
        public string Subtitle { get; set; }
        public string Color { get; set; }
    }
}