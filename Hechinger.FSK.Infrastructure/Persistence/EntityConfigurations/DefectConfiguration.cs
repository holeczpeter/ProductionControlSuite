namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class DefectConfiguration : IEntityTypeConfiguration<Defect>
    {
        public void Configure(EntityTypeBuilder<Defect> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            EntityConfiguration.ConfigureBaseEntity(builder);
            builder
                .HasOne(x => x.Operation)
                .WithMany(x => x.Defects)
                .HasForeignKey(x => x.OperationId)
                .HasConstraintName("FK_OPERATIONDEFECTS_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
