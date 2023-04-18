namespace ProductionControlSuite.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class OperationConfiguration : IEntityTypeConfiguration<Operation>
    {
        public void Configure(EntityTypeBuilder<Operation> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            EntityConfiguration.ConfigureBaseEntity(builder);
            builder
                .HasOne(x => x.Product)
                .WithMany(x => x.Operations)
                .HasForeignKey(x => x.ProductId)
                .HasConstraintName("FK_PRODUCTIONOPERATION_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
