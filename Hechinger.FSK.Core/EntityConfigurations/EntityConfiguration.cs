using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Core.EntityConfigurations
{
    public static class EntityConfiguration
    {
        public static void ConfigureEntityPart<TEntity>(EntityTypeBuilder<TEntity> builder) where TEntity : Entity
        {

            builder.HasKey(x => x.Id);
            builder
                .Property(e => e.Created).ValueGeneratedOnAdd();
            builder
                .Property(e => e.Created)
                .IsRequired();
            builder
                .Property(e => e.Creator);
            builder
                .Property(e => e.LastModified)
                .IsRequired();
            builder
                .Property(e => e.LastModifier);
            builder
                .HasIndex(e => e.EntityStatus);
            builder
                .Property(e => e.RowVersion)
                .IsRowVersion();
        }
    }
}
