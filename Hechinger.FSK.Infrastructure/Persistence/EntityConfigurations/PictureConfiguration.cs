using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
