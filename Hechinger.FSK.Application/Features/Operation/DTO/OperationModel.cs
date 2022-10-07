﻿namespace Hechinger.FSK.Application.Features
{
    public class OperationModel: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
    }
}