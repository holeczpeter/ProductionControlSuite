using Hechinger.FSK.Core.Entities;
using Hechinger.FSK.Core.EntityConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Hechinger.FSK.Core.FSKDbContext
{
    public class FSKDbContext : DbContext
    {
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
