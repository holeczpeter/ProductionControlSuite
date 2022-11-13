using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class WorkShopConfiguration : IEntityTypeConfiguration<Workshop>
    {
        public void Configure(EntityTypeBuilder<Workshop> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            EntityConfiguration.ConfigureBaseEntity(builder);
        }
    }
}
