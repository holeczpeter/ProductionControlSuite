using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Web.Controllers
{
    [Authorize]
    public class DocumentController : ControllerBase
    {
        private readonly IMediator mediator;
        public DocumentController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        ActionResult File(DownloadDocument document) =>
          document == null
              ? Ok()
              : File(document.File ?? Array.Empty<byte>(), document.MimeType ?? "text/plain", document.DocumentName ?? "none.docx");
        [HttpGet]
        public async Task<ActionResult> GetUserManual(GetUserMaual request,CancellationToken cancellationToken)
        {
            var result = await this.mediator.Send(request,cancellationToken);
            return File(result);
        }
    }
}
