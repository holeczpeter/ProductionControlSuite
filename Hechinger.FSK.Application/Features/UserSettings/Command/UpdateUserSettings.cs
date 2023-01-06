namespace Hechinger.FSK.Application.Features
{
    public class UpdateUserSettings : IRequest<Result<bool>>
    {
        public int Id { get; set; }

        public int LanguageId { get; set; }

        public int PageSize { get; set; }

        public AvatarTypes AvatarType { get; set; }
    }
}
