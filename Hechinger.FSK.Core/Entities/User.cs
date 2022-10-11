namespace Hechinger.FSK.Core.Entities
{
    public class User : Entity
    {
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{LastName} {FirstName}";
        public string Password { get; set; }
        public string Salt { get; set; }
        public bool IsTemporary { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime ChangePass { get; set; }
        public virtual int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public virtual int LanguageId { get; set; }
        public virtual Language Language { get; set; }
        public virtual ICollection<SummaryCard> SummaryCards { get; set; } = new HashSet<SummaryCard>();
        public virtual ICollection<WorkShopUser> WorkShops { get; set; } = new HashSet<WorkShopUser>();
    }
}
