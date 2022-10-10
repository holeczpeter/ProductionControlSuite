namespace Hechinger.FSK.Application.Features
{
    public class QualityAssuranceProductModel : BaseModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public IEnumerable<QualityAssuranceOperationItemModel> Operations { get; set; }
    }

    public class QualityAssuranceOperationItemModel : BaseModel
    {
        public int OperationId { get; set; }
        public string OperationName { get; set; }
        public string OperationCode { get; set; }
        public int Quantity { get; set; }
        public IEnumerable<QualityAssuranceDefectModel> Defects { get; set; }
    }

    public class QualityAssuranceDefectModel : BaseModel
    {
        public int DefectId { get; set; }
        public string DefectName { get; set; }
        public string DefectCode { get; set; }
        public DefectCategories Category { get; set; }
        public IEnumerable<QualityAssuranceModel> Models { get; set; }
        public int SumQuantity { get; set; }
        public int SumPPM { get; set; }
    }

    public class QualityAssuranceModel : BaseModel
    {

        public DateTime Date { get; set; }
        public int Month { get; set; }
        public int Quantity { get; set; }
    }
}
