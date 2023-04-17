namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    internal class PictureConfiguration : IEntityTypeConfiguration<Picture>
    {
        public void Configure(EntityTypeBuilder<Picture> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            builder
             .HasOne(x => x.Defect)
             .WithMany(x => x.Pictures)
             .HasForeignKey(x => x.DefectId)
             .HasConstraintName("FKDEFECTPICTURE_CONNECTION")
             .OnDelete(DeleteBehavior.Restrict)
             .IsRequired();
        }
    }
}
