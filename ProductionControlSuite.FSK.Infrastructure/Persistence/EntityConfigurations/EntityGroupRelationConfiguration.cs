namespace ProductionControlSuite.FSK.Infrastructure.Persistence.EntityConfigurations
{
    internal class EntityGroupRelationConfiguration : IEntityTypeConfiguration<EntityGroupRelation>
    {
        public void Configure(EntityTypeBuilder<EntityGroupRelation> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);

            builder
                .HasOne(x => x.EntityGroup)
                .WithMany(x => x.EntityGroupRelations)
                .HasForeignKey(x => x.EntityGroupId)
                .HasConstraintName("FK_GROUPRELATION_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

           
        }
    }
}
