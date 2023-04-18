namespace ProductionControlSuite.FSK.Core.Entities
{
    public class Picture : Entity
    {
        public byte[] ImageData { get; set; }
        public virtual int DefectId { get; set; }
        public virtual Defect Defect { get; set; }
    }
}
