namespace ProductionControlSuite.FSK.Infrastructure.Persistence.EntityConfigurations
{
    internal class AuditLogPropertiesConfiguration : IEntityTypeConfiguration<AuditLogProperty>
    {
        public void Configure(EntityTypeBuilder<AuditLogProperty> builder)
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

            builder
               .HasOne(c => c.AuditLogEntity)
               .WithMany(g => g.AuditLogProperties)
               .HasForeignKey(s => s.AuditLogEntityId)
               .HasConstraintName("FK_AUDITANDITEMS_CONNECTION")
               .OnDelete(DeleteBehavior.Restrict);


        }
    }
}
