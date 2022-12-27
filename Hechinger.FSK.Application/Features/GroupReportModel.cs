namespace Hechinger.FSK.Application.Features
{
    public class GroupReportModel: BaseModel
    {
        public IEnumerable<QuantityOperationReportModel> Items { get; set; }
    }
}
