using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            EntityConfiguration.ConfigureBaseEntity(builder);
            builder
             .HasOne(x => x.Workshop)
             .WithMany(x => x.Products)
             .HasForeignKey(x => x.WorkshopId)
             .HasConstraintName("FK_WORKSHOPPRODUCT_CONNECTION")
             .OnDelete(DeleteBehavior.Restrict)
             .IsRequired();
        }
    }
}

