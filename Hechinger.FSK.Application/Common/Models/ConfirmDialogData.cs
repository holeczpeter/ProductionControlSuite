namespace Hechinger.FSK.Application.Common
{
    public class ConfirmDialogData : BaseModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IEnumerable<ConfirmDialogResult> Buttons { get; set; }
        public ConfirmationTypes Type { get; set; }
      
    }
}
