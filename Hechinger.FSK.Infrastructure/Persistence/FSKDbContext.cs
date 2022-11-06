using Hechinger.FSK.Core.Common;
using Hechinger.FSK.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Hechinger.FSK.Infrastructure.Persistence
{
    public class FSKDbContext : DbContext
    {
        public DbSet<AuditLogEntity> AuditLogEntities { get; set; }
        public DbSet<AuditLogProperty> AuditLogProperties { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<WorkShopUser> WorkShopUsers { get; set; }
        public DbSet<MenuRole> MenuRoles { get; set; }
        public DbSet<WorkShop> WorkShops { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Defect> Defects { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<SummaryCard> SummaryCards { get; set; }
        public DbSet<SummaryCardItem> SummaryCardItem { get; set; }
        public DbSet<Language> Languages { get; set; }
        public IHttpContextAccessor httpContextAccessor;
        public FSKDbContext(DbContextOptions options) : base(options)
        {

        }
      
        public FSKDbContext(DbContextOptions options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ModelConfigurator.ConfigureModelEntities(modelBuilder);
        }
        public override int SaveChanges()
        {
            OnBeforeChanges();
            return base.SaveChanges();
        }
        public async override Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
           //await OnBeforeChangesAsync();
            return await base.SaveChangesAsync();
        }

        public void OnBeforeChanges()
        {
            UpdateEntityInfo();
        }
        public async Task OnBeforeChangesAsync()
        {
            await Task.Factory.StartNew(() =>
            {
                UpdateEntityInfo();
            });

        }
        private void UpdateEntityInfo()
        {
            var entries = ChangeTracker.Entries().Where(e => e.Entity is BaseEntity && (e.State == EntityState.Added || e.State == EntityState.Modified)).ToList();
            var currentUser = GetCurrentUser();

            foreach (var entityEntry in entries)
            {

                if (entityEntry.State == EntityState.Added)
                {
                    var creator = ((BaseEntity)entityEntry.Entity).Creator;

                    ((BaseEntity)entityEntry.Entity).Creator = !string.IsNullOrEmpty(creator) ? creator : !string.IsNullOrEmpty(currentUser) ? currentUser : string.Empty;
                    ((BaseEntity)entityEntry.Entity).Created = DateTime.Now;
                    ((BaseEntity)entityEntry.Entity).LastModified = DateTime.Now;
                    ((BaseEntity)entityEntry.Entity).LastModifier = !string.IsNullOrEmpty(creator) ? creator : !string.IsNullOrEmpty(currentUser) ? currentUser : string.Empty;
                }
                else
                {
                    ((BaseEntity)entityEntry.Entity).LastModified = DateTime.Now;
                    ((BaseEntity)entityEntry.Entity).LastModifier = !string.IsNullOrEmpty(currentUser) ? currentUser : string.Empty;
                }
            }
        }
        public string GetCurrentUser()
        {
            var claim = this.httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(x => x.Type == "user");
            if (claim != null) return claim.Value;
            else return string.Empty;
        }
    }
}
