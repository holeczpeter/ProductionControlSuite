using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class OperationConfiguration : IEntityTypeConfiguration<Operation>
    {
        public void Configure(EntityTypeBuilder<Operation> builder)
        {
            EntityConfiguration.ConfigureEntityPart(builder);

            builder
                .HasOne(x => x.Product)
                .WithMany(x => x.Operations)
                .HasForeignKey(x => x.ProductId)
                .HasConstraintName("FK_PRODUCTIONOPERATION_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
