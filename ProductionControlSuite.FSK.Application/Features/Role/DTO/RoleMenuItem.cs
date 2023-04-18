namespace ProductionControlSuite.FSK.Application.Features
{
    public class RoleMenuItem : BaseModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public MenuTypes Type { get; set; }

        public long ParentId { get; set; }
        public bool IsEnabled { get; set; }
    }
}
