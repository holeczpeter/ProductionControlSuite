namespace ProductionControlSuite.FSK.Application.Features
{
    public class RoleModel: BaseModel
    {
      
        public int Id { get; set; }
       
        public string Name { get; set; }
       
        public string Code { get; set; }
      
        public string TranslatedName { get; set; }
        
        public bool IsDefault { get; set; }
    }
}
