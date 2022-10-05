using Hechinger.FSK.Core.Common;
using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hechinger.FSK.Infrastructure.Persistence
{
    public class FSKDbContext : DbContext
    {
        public DbSet<AuditLogEntity> AuditLogEntities { get; set; }
        public DbSet<AuditLogProperty> AuditLogProperties { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<MenuRole> MenuRoles { get; set; }
        public DbSet<WorkShop> WorkShops { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Defect> Defects { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<SummaryCard> SummaryCards { get; set; }
        public DbSet<SummaryCardItem> SummaryCardItem { get; set; }
        public FSKDbContext(DbContextOptions options) : base(options)
        {

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
            await OnBeforeChangesAsync();
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
            var currentUser = "SYSTEM";

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
    }
}
