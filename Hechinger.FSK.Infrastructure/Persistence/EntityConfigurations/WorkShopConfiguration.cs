using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class WorkShopConfiguration : IEntityTypeConfiguration<WorkShop>
    {
        public void Configure(EntityTypeBuilder<WorkShop> builder)
        {
            EntityConfiguration.ConfigureEntityPart(builder);

        }
    }
}
