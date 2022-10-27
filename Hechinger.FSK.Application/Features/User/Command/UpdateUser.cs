namespace Hechinger.FSK.Application.Features
{
    public class UpdateUser : IRequest<Result<bool>>
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public int LanguageId { get; set; }
      
        public string Password { get; set; }

        public IEnumerable<WorkshopUserItem> Workshops { get; set; }
    }
}
