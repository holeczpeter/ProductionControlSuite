using Microsoft.AspNetCore.StaticFiles;
namespace Hechinger.FSK.Application.Features
{
    public class GetUserManualHandler : IRequestHandler<GetUserMaual, DownloadDocument>
    {
        public Task<DownloadDocument> Handle(GetUserMaual request, CancellationToken cancellationToken)
        {
            var fileName = "FSK_FelhKK_v1.0_2022.12.21.pdf";
            var userManualPath = Path.Combine(Directory.GetCurrentDirectory(), "UserManual", fileName);
            byte[] bytes = System.IO.File.ReadAllBytes(userManualPath);
            var provider = new FileExtensionContentTypeProvider();
            var mimeType = (string file) =>
            {
                const string DefaultContentType = "application/pdf";
                if (!provider.TryGetContentType(file, out string contentType))
                {
                    contentType = DefaultContentType;
                }

                return contentType;
            };

            
            return Task.FromResult(new DownloadDocument() { File = bytes, MimeType = mimeType(fileName), DocumentName = fileName });
        }
    }
}
