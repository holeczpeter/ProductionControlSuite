using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class ShiftConfiguration : IEntityTypeConfiguration<Shift>
    {
        public void Configure(EntityTypeBuilder<Shift> builder)
        {
            EntityConfiguration.ConfigureEntity(builder);
            EntityConfiguration.ConfigureBaseEntity(builder);
        }
    }
}
