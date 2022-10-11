using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class WorkShopUserConfiguration : IEntityTypeConfiguration<WorkShopUser>
    {
        public void Configure(EntityTypeBuilder<WorkShopUser> builder)
        {
            EntityConfiguration.ConfigureEntityPart(builder);

            builder
                .HasOne(x => x.WorkShop)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.WorkShopId)
                .HasConstraintName("FK_WORKSHOPUSER_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.WorkShops)
                .HasForeignKey(x => x.UserId)
                .HasConstraintName("FK_USERWORKSHOP_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
