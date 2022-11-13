using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    internal class AuditLogPropertiesConfiguration : IEntityTypeConfiguration<AuditLogProperty>
    {
        public void Configure(EntityTypeBuilder<AuditLogProperty> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            builder
                .HasOne(x => x.AuditLogEntity)
                .WithMany(x => x.AuditLogProperties)
                .HasForeignKey(x => x.AuditLogEntityId)
                .HasConstraintName("FK_AUDITLOGENTITYANDPROPS_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
