﻿namespace Hechinger.FSK.Application.Features
{
    public class ProductContext: BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string TranslatedName { get; set; }
        public int WorkshopId { get; set; }
        public IEnumerable<OperationContext> Operations { get; set; } = new List<OperationContext>();
    }
    public class OperationContext : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }
        public IEnumerable<DefectContext> Defects { get; set; } = new List<DefectContext>();
    }
    public class DefectContext : BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TranslatedName { get; set; }
        public string Code { get; set; }
        public DefectCategories DefectCategory { get; set; }
    }
}