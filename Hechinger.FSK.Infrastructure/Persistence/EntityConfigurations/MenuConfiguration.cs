using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class MenuConfiguration : IEntityTypeConfiguration<Menu>
    {
        public void Configure(EntityTypeBuilder<Menu> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            EntityConfiguration.ConfigureBaseEntity(builder);
        }
    }
}
