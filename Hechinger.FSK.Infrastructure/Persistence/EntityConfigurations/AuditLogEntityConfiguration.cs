namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class AuditLogEntityConfiguration : IEntityTypeConfiguration<AuditLogEntity>
    {
        public void Configure(EntityTypeBuilder<AuditLogEntity> builder)
        {

            builder.HasKey(c => c.Id);

            builder
                .Property(e => e.Created)
                .IsRequired();
            builder
                .Property(e => e.Creator);
            builder
                .Property(e => e.LastModified)
                .IsRequired();
            builder
                .Property(e => e.LastModifier);

            builder
                .Property(e => e.RowVersion)
                .IsRowVersion();
        }
    }
}
