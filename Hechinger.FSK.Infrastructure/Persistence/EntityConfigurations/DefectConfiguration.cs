using Hechinger.FSK.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hechinger.FSK.Infrastructure.Persistence.EntityConfigurations
{
    public class DefectConfiguration : IEntityTypeConfiguration<Defect>
    {
        public void Configure(EntityTypeBuilder<Defect> builder)
        {
            EntityConfiguration.ConfigureEntityPart(builder);
            builder
                .HasOne(x => x.Operation)
                .WithMany(x => x.Defects)
                .HasForeignKey(x => x.OperationId)
                .HasConstraintName("FK_OPERATIONDEFECTS_CONNECTION")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}
