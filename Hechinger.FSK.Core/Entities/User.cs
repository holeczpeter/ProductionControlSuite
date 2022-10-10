namespace Hechinger.FSK.Core.Entities
{
    public class User : Entity
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{LastName} {FirstName}";
        public string Salt { get; set; }
        public bool IsTemporary { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime ChangePass { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new HashSet<UserRole>();
        public virtual ICollection<SummaryCard> SummaryCards { get; set; } = new HashSet<SummaryCard>();
    }
}
