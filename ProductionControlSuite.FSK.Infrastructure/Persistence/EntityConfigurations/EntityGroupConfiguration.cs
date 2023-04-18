namespace ProductionControlSuite.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class EntityGroupConfiguration : IEntityTypeConfiguration<EntityGroup>
    {
        public void Configure(EntityTypeBuilder<EntityGroup> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);

            builder
                .HasOne(x => x.Parent)
                .WithMany(x => x.Children)
                .HasForeignKey(x => x.ParentId)
                .IsRequired(false)
                .HasConstraintName("FK_ENTITYGROUP_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict);
                


        }
    }
}
